'use client';
import Button from '@app/_components/shared/button';
import cookieKeys from '@app/_consts/cookies';
import { db } from '@app/_firebase/firebase';
import { secondsToTimeFormat } from '@app/_helpers/functions';
import useTrackers from '@app/_hooks/useTrackers';
import { Tracker } from '@app/_types/Tracker';
import CalendarIcon from '@public/icons/CalendarIcon';
import PauseIcon from '@public/icons/PauseIcon';
import PencilIcon from '@public/icons/PencilIcon';
import PlayIcon from '@public/icons/PlayIcon';
import StopIcon from '@public/icons/StopIcon';
import StopwatchIcon from '@public/icons/StopwatchIcon';
import TrashIcon from '@public/icons/TrashIcon';
import { format } from 'date-fns';
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { useCookies } from 'next-client-cookies';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import styles from './page.module.scss';
import { ProgressSpinner } from 'primereact/progressspinner';
import strings from '@app/_consts/strings.json';
import { DATE_FORMAT } from '@app/_consts/consts';

interface TrackersData {
  id: string;
  duration: string | JSX.Element;
  description: string;
  actions: JSX.Element | null;
}
const defaultTracker = {
  id: '',
  duration: 0,
  endTime: null,
  paused: false,
  finished: false,
  description: '',
  pauses: []
};
export const trackersCollectionName = 'trackers';

export default function Home() {
  const { trackers, setTrackers, isLoading, activeDuration, clearActiveInterval } = useTrackers();
  const cookies = useCookies();

  const activeTracker = trackers.some((tracker) => !tracker.finished && !tracker.paused);
  const activeId = trackers.find((tracker) => !tracker.paused)?.id;

  const addTracker = async () => {
    if (activeTracker) {
      console.log('cannot, there is an active one');
    } else {
      const startTime = new Date();
      try {
        const userId = cookies.get(cookieKeys.TOKEN);
        let tracker: Tracker;
        if (userId) {
          tracker = {
            ...defaultTracker,
            userId,
            startTime
          };

          const docRef = await addDoc(collection(db, trackersCollectionName), tracker);
          setTrackers((prev) => [{ ...tracker, id: docRef.id }, ...prev]);
        }
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  const onPause = async (id: string) => {
    const trackerDoc = doc(db, trackersCollectionName, id);
    await updateDoc(trackerDoc, {
      paused: true,
      pauses: arrayUnion({ startTime: new Date(), endTime: null })
    });

    setTrackers((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, paused: true, duration: activeDuration || 0 } : item
      )
    );
    clearActiveInterval();
  };

  const onResume = async (id: string, duration: number) => {
    const now = new Date();
    if (activeTracker) {
      console.log('nope');
    } else {
      const docRef = doc(db, trackersCollectionName, id);
      const docSnap = await getDoc(docRef);
      const newPauses = docSnap
        ?.data()
        ?.pauses.map((pause: { startTime: Date; endTime: Date }) =>
          pause.endTime === null ? { startTime: pause.startTime, endTime: now } : pause
        );
      const trackerDoc = doc(db, trackersCollectionName, id);
      await updateDoc(trackerDoc, {
        paused: false,
        pauses: newPauses
      });
      setTrackers((prev) =>
        prev.map((item) => (item.id === id ? { ...item, paused: false } : item))
      );
    }
  };

  const onStop = async (id?: string) => {
    if (id) {
      const trackerDoc = doc(db, trackersCollectionName, id);

      await updateDoc(trackerDoc, {
        finished: true,
        duration: secondsToTimeFormat(activeDuration || 0)
      });
      setTrackers((prev) => prev.filter((item) => item.id !== id));
      clearActiveInterval();
    }
  };

  const deleteTracker = async (id: string) => {
    const trackerDoc = doc(db, trackersCollectionName, id);
    try {
      await deleteDoc(trackerDoc);
      setTrackers((prev) => prev.filter((tracker) => tracker.id !== id));
    } catch (e) {
      console.log('could not delete');
    }
  };

  const mappedColumns: TrackersData[] = trackers.map((tracker) => ({
    id: tracker.id,
    duration: tracker.paused ? (
      secondsToTimeFormat(tracker.duration)
    ) : (
      <div>
        {activeDuration
          ? secondsToTimeFormat(activeDuration)
          : secondsToTimeFormat(tracker.duration)}
      </div>
    ),
    description: tracker.description,
    actions: tracker.finished ? null : (
      <>
        {tracker.paused ? (
          <Button variant="text" onClick={() => onResume(tracker.id, tracker.duration)}>
            <PlayIcon key={'play-icon'} />
          </Button>
        ) : (
          <Button variant="text" onClick={() => onPause(tracker.id)}>
            <PauseIcon />
          </Button>
        )}
        <Button variant="text" onClick={() => onStop(tracker.id)}>
          <StopIcon key={'stop-icon'} />
        </Button>
      </>
    )
  }));

  const textEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        className={styles.editCell}
        type="text"
        value={options.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          options.editorCallback && options.editorCallback(e.target.value)
        }
      />
    );
  };

  const rowEditorTemplate = (rowData: TrackersData, props: any) => {
    const rowEditor = props.rowEditor;
    const baseButtons = rowData.actions;
    if (rowEditor.editing) {
      return (
        <div className={styles.rowButtons}>
          {baseButtons}
          {rowEditor.element}
          <TrashIcon />
        </div>
      );
    } else {
      return (
        <div className={styles.rowButtons}>
          {baseButtons}
          <Button
            variant="text"
            disabled={activeTracker}
            onClick={rowEditor.onInitClick}
            className={rowEditor.initClassName}>
            <PencilIcon />
          </Button>
          <Button
            onClick={() => deleteTracker(rowData.id)}
            variant="text"
            disabled={!trackers.find((tracker) => tracker.id === rowData.id)?.paused}>
            <TrashIcon />
          </Button>
        </div>
      );
    }
  };

  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    const id = e.data.id;
    const desc = e.newData.description;
    setTrackers((prev) =>
      prev.map((item) => (item.id === e.data.id ? { ...item, description: desc } : item))
    );
    const trackerDoc = doc(db, trackersCollectionName, id);

    await updateDoc(trackerDoc, {
      description: desc
    });
  };

  return (
    <main>
      <section className={styles.titleSection}>
        <CalendarIcon />
        <h1 className={styles.title}>{`${strings.trackers.today} (${format(
          new Date(),
          DATE_FORMAT
        )})`}</h1>
      </section>
      <section className={styles.buttonsSection}>
        <Button disabled={activeTracker} onClick={addTracker} icon={<StopwatchIcon />}>
          {strings.trackers.new}
        </Button>
        <Button
          onClick={() => onStop(activeId)}
          disabled={!activeTracker}
          variant="secondary"
          icon={<StopIcon fill="#fff" />}>
          {strings.trackers.stop}
        </Button>
      </section>

      {isLoading ? (
        <ProgressSpinner className={styles.spinner} />
      ) : (
        <DataTable editMode="row" onRowEditComplete={onRowEditComplete} value={mappedColumns}>
          <Column
            field="duration"
            header={strings.trackers.table.duration}
            style={{ width: '20%' }}></Column>
          <Column
            field="description"
            header={strings.trackers.table.description}
            style={{ width: '60%' }}
            editor={(options: ColumnEditorOptions) => textEditor(options)}></Column>
          <Column
            rowEditor
            body={rowEditorTemplate}
            field="actions"
            header={strings.trackers.table.actions}
            style={{ width: '20%' }}></Column>
        </DataTable>
      )}
    </main>
  );
}

'use client';
import Button from '@app/_components/shared/button';
import Modal from '@app/_components/shared/modal';
import { DATE_FORMAT, trackersCollectionName } from '@app/_consts/consts';
import strings from '@app/_consts/strings.json';
import { db } from '@app/_firebase/firebase';
import { secondsToTimeFormat } from '@app/_helpers/functions';
import useHistoryTrackers from '@app/_hooks/useHistoryTrackers';
import useModal from '@app/_hooks/useModal';
import CalendarIcon from '@public/icons/CalendarIcon';
import PencilIcon from '@public/icons/PencilIcon';
import TrashIcon from '@public/icons/TrashIcon';
import { format, isBefore, isSameDay } from 'date-fns';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Calendar } from 'primereact/calendar';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Nullable } from 'primereact/ts-helpers';
import React, { useRef, useState } from 'react';
import styles from './page.module.scss';

export interface Filters {
  search: string;
  startDate: Nullable<Date>;
  endDate: Nullable<Date>;
}

interface HistoryData {
  id: string;
  description: string;
  duration: string;
}

function History() {
  const [filters, setFilters] = useState<Filters>({ startDate: null, endDate: null, search: '' });
  const { trackers, setTrackers, isLoading } = useHistoryTrackers();
  const { isOpen, itemId, closeModal, openModal } = useModal();
  const searchTimerRef = useRef<NodeJS.Timeout>();

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

  const filteredData = trackers
    .filter((item) => (filters.startDate ? !isBefore(item.startTime, filters.startDate) : item))
    .filter((item) =>
      filters.endDate && item.endTime
        ? isBefore(item.endTime, filters.endDate) || isSameDay(item.endTime, filters.endDate)
        : item
    )
    .filter((item) => item.description.includes(filters.search));

  const deleteTracker = async (id?: string) => {
    if (id) {
      const trackerDoc = doc(db, trackersCollectionName, id);
      try {
        await deleteDoc(trackerDoc);
        setTrackers((prev) => prev.filter((tracker) => tracker.id !== id));
      } catch (e) {
        console.log('could not delete');
      }
      closeModal();
    }
  };

  const mappedColumns: HistoryData[] = filteredData.map((tracker) => ({
    id: tracker.id,
    duration: secondsToTimeFormat(tracker.duration),
    description: tracker.description,
    date: format(tracker.startTime, DATE_FORMAT)
  }));

  const rowEditorTemplate = (rowData: HistoryData, props: any) => {
    const rowEditor = props.rowEditor;
    if (rowEditor.editing) {
      return (
        <div className={styles.rowButtons}>
          {rowEditor.element}
          <TrashIcon />
        </div>
      );
    } else {
      return (
        <div className={styles.rowButtons}>
          <Button
            variant="text"
            onClick={rowEditor.onInitClick}
            className={rowEditor.initClassName}>
            <PencilIcon />
          </Button>
          <Button onClick={() => openModal(rowData.id)} variant="text">
            <TrashIcon />
          </Button>
        </div>
      );
    }
  };

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

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setFilters((prev: Filters) => ({ ...prev, search: e.target.value }));
    }, 1000);
  };

  return (
    <main>
      <section>
        <h1 className={styles.title}>{strings.history.title}</h1>
      </section>
      {isLoading ? (
        <ProgressSpinner className={styles.spinner} />
      ) : (
        <section>
          <div className={styles.filters}>
            <span className="p-float-label">
              <Calendar
                dateFormat="dd.mm.yy"
                id="start-date-picker"
                className={styles.filter}
                value={filters.startDate}
                onChange={(e) => setFilters((prev: Filters) => ({ ...prev, startDate: e.value }))}
                showIcon
                icon={<CalendarIcon />}
              />
              <label htmlFor="start-date-picker">{strings.history.filters.startDate}</label>
            </span>
            <span className="p-float-label">
              <Calendar
                dateFormat="dd.mm.yy"
                id="end-date-picker"
                className={styles.filter}
                value={filters.endDate}
                onChange={(e) => setFilters((prev: Filters) => ({ ...prev, endDate: e.value }))}
                showIcon
                icon={<CalendarIcon />}
              />
              <label htmlFor="end-date-picker">{strings.history.filters.endDate}</label>
            </span>
            <span className="p-float-label">
              <InputText id="search-input" className={styles.filter} onChange={onSearch} />
              <label htmlFor="search-input">{strings.history.filters.description}</label>
            </span>
          </div>
          <DataTable editMode="row" onRowEditComplete={onRowEditComplete} value={mappedColumns}>
            <Column field="date" header={strings.history.table.date} style={{ width: '20%' }} />
            <Column
              field="description"
              header={strings.history.table.description}
              style={{ width: '40%' }}
              editor={(options: ColumnEditorOptions) => textEditor(options)}></Column>
            <Column
              field="duration"
              header={strings.history.table.duration}
              style={{ width: '20%' }}></Column>
            <Column
              rowEditor
              body={rowEditorTemplate}
              field="actions"
              header={strings.history.table.actions}
              style={{ width: '20%' }}></Column>
          </DataTable>
        </section>
      )}
      <Modal
        isOpen={isOpen}
        action={deleteTracker}
        title={strings.modal.deleteTracker.title}
        closeModal={closeModal}
        itemId={itemId}
        key="delete-tracker-modal"
        content={strings.modal.deleteTracker.body}
      />
    </main>
  );
}

export default History;

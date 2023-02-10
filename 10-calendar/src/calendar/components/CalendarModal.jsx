import {useEffect, useMemo, useState} from 'react';
import Modal from 'react-modal';
import {addHours, differenceInSeconds} from 'date-fns';
import DatePicker, {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import {useCalendarStore, useUiStore} from '../../hooks';

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const {isDateModalOpen, closeDateModal} = useUiStore();
    const {activeEvent, startSavingEvent} = useCalendarStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(),2),
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';
        return (formValues.title.length > 0) ?
            ''
            : 'is-invalid';

    }, [formValues.title, formSubmitted]);

    useEffect(() => {
        if ( activeEvent !== null ) {
            setFormValues({...activeEvent});
        }
    }, [activeEvent])

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    };

    const handleDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        });
    };

    const handleCloseModal = () => {
        closeDateModal();
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const diff = differenceInSeconds(formValues.end, formValues.start);
        if (isNaN(diff) || diff <= 0) {
            Swal.fire('Incorrect dates', 'Check input dates', 'error')
            return;
        }

        if (formValues.title.length <= 0) return;

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmitted(false);
    };

    return (
        <div>
            <Modal
                isOpen={isDateModalOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
                className="modal"
                overlayClassName="modal-fondo"
                closeTimeoutMS={200}
            >
                <h1> New Event </h1>
                <hr/>
                <form className="container" onSubmit={handleSubmit}>

                    <div className="form-group mb-2">
                        <label>Start datetime</label>
                        <DatePicker
                            className="form-control"
                            selected={formValues.start}
                            onChange={ (ev) => handleDateChanged(ev,'start') }
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                        />
                    </div>

                    <div className="form-group mb-2">
                        <label>Finish datetime</label>
                        <DatePicker
                            className="form-control"
                            selected={formValues.end}
                            onChange={ (ev) => handleDateChanged(ev,'end') }
                            dateFormat="Pp"
                            minDate={formValues.start}
                            showTimeSelect
                            locale="es"
                        />
                    </div>

                    <hr/>
                    <div className="form-group mb-2">
                        <label>Title & notes</label>
                        <input
                            type="text"
                            className={`form-control ${titleClass}`}
                            placeholder="Event title"
                            name="title"
                            autoComplete="off"
                            value={formValues.title}
                            onChange={handleInputChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">Short description</small>
                    </div>

                    <div className="form-group mb-2">
                        <textarea
                            className="form-control"
                            placeholder="Notes"
                            rows="5"
                            name="notes"
                            value={formValues.notes}
                            onChange={handleInputChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Additional info</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Save</span>
                    </button>

                </form>
            </Modal>
        </div>
    );
};

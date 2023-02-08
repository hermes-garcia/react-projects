import {useEffect, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Grid, IconButton, TextField, Typography} from '@mui/material';
import {DeleteOutline, SaveOutlined, UploadOutlined} from '@mui/icons-material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import {ImageGallery} from '../components';
import {useForm} from '../../hooks';
import {setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles} from '../../store/journal';

export const NoteView = () => {
    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector(state => state.journal);

    const { body, title, date, handleInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote(formState) )
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Updated', messageSaved, 'success');
        }
    }, [messageSaved]);

    const handleSaveNote = () => {
        dispatch( startSaveNote() );
    };

    const handleFileInputChange = ({target}) => {
        if (target.files === 0) return;

        dispatch( startUploadingFiles(target.files) )
    };

    const handleDeleteNote = () => {
        dispatch( startDeletingNote() )
    };

    return (
        <Grid className="animate__animated animate__fadeIn animate__faster"
            container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb:1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
            </Grid>

            <Grid item>

                <input
                    type="file"
                    multiple
                    onChange={ handleFileInputChange }
                    style={ {display: 'none'} }
                    ref={fileInputRef}
                />

                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>


                <Button
                    onClick={handleSaveNote}
                    color="primary" sx={{ padding: 2 }}
                    disabled={isSaving}
                >
                    <SaveOutlined sx={{ fontSize:30, mr: 1 }} />
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Insert a title"
                    label="Title"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="What happened today?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                />

                <Grid container justifyContent="end">
                    <Button
                        onClick={ handleDeleteNote }
                        sx={{mt:2}}
                        color="error"
                    >
                        <DeleteOutline />
                        Delete
                    </Button>

                </Grid>

                <ImageGallery images={note.imageUrls} />

            </Grid>

        </Grid>
    );
};
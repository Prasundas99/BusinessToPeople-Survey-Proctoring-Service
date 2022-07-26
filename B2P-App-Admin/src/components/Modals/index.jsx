import React from 'react'
import clsx from 'clsx'
import {
  Button,
  Box,
  TextField,
  Modal,
  Backdrop,
  Typography,
  FormGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

import { Android12Switch, useStyles } from './modal.style.js'
function Modals ({ contentText, setNewContent, content, open, setOpen, submitFunction, handleClose, checkMandatory, handleRequired, typeOfAns, setTypeOfAns }) {
  const classes = useStyles()

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={open}
      onClose={handleClose}
      // closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 100
      }}
    >
      <Box in={open} className={classes.paper}>
        <div>
          <Typography
            style={{ marginTop: '1vw' }}
            variant='h4'
            color='primary'
            id='transition-modal-title'
          >
            {contentText}
          </Typography>
          <FormGroup>
            <FormControlLabel
              label='Mandatory'
              labelPlacement='start'
              control={
                <Android12Switch
                  checked={checkMandatory}
                  onChange={handleRequired}
                />
              }
            />
          </FormGroup>
          <p id='transition-modal-description'>
            <TextField
              type={contentText}
              required
              placeholder={contentText}
              fullWidth
              variant='outlined'
              className={classes.margin}
              onChange={(e) => {
                setNewContent(e.target.value)
              }}
              value={content}
            />
            <br />
            <FormControl fullWidth>
              <InputLabel id='user-type-label'>Type of Answer</InputLabel>
              <Select
                variant='outlined'
                labelId='user Type'
                id='user-type'
                label='Type Of User'
                required
                value={typeOfAns}
                onChange={(e) => setTypeOfAns(e.target.value)}
              >
                <MenuItem value='text'>Text</MenuItem>
                <MenuItem value='file'>File</MenuItem>
              </Select>
            </FormControl>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={() => submitFunction(content, typeOfAns, checkMandatory)}
              className={classes.editPopupBtn}
            >
              Submit
            </Button>
            <Button
              onClick={() => handleClose()}
              className={clsx(classes.editPopupBtn, classes.editPopupBtn_cancel)}
            >
              Cancel
            </Button>
          </p>
        </div>
      </Box>
    </Modal>
  )
}

export default Modals

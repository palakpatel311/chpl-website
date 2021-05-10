import React, { useState } from 'react';
import { arrayOf, func } from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ChplTextField } from '../../../../util';
import { reliedUponSoftware } from '../../../../../shared/prop-types';

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gap: '8px',
  },
  dataEntry: {
    display: 'grid',
    gridTemplateColumns: '2fr 2fr 1fr',
    gap: '4px',
  },
  dataEntryActions: {
    gridColumn: '3 / 4',
    gridRow: '1 / 3',
    alignSelf: 'center',
    justifySelf: 'center',
  },
  dataEntryAddNew: {
    gridColumn: '1 / 4',
    gridRow: '1 / 3',
  },
}));

const validationSchema = yup.object({
});

function ChplReliedUponSoftwareEdit(props) {
  /* eslint-disable react/destructuring-assignment */
  const [adding, setAdding] = useState(false);
  const [software, setSoftware] = useState(props.software);
  const classes = useStyles();
  /* eslint-enable react/destructuring-assignment */

  const formik = useFormik({
    initialValues: {
      name: '',
      version: '',
      certifiedProductNumber: '',
      grouping: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnMount: true,
  });

  const update = (updated) => {
    props.onChange({ key: 'additionalSoftware', data: updated });
  };

  const addNew = () => {
    const updated = [
      ...software,
      {
        name: formik.values.name || null,
        version: formik.values.version || null,
        certifiedProductNumber: formik.values.certifiedProductNumber || null,
        grouping: formik.values.grouping,
        key: (new Date()).getTime(),
      },
    ];
    setSoftware(updated);
    formik.resetForm();
    setAdding(false);
    update(updated);
  };

  const cancelAdd = () => {
    formik.resetForm();
    setAdding(false);
  };

  const removeItem = (item) => {
    const updated = software.filter((s) => !(s.id === item.id && s.key === item.key));
    setSoftware(updated);
    update(updated);
  };

  return (
    <Container className={classes.container}>
      { software.length > 0
        && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="subtitle2">Name</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2">Version</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2">CHPL ID</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2">Group</Typography></TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                { software.map((item) => (
                  <TableRow key={item.id || item.key}>
                    <TableCell>
                      <Typography variant="subtitle2">{ item.name }</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{ item.version }</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{ item.certifiedProductNumber }</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{ item.grouping }</Typography>
                    </TableCell>
                    <TableCell>
                      { !adding
                        && (
                          <IconButton
                            onClick={() => removeItem(item)}
                          >
                            <CloseIcon
                              color="primary"
                              size="small"
                            />
                          </IconButton>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      <div className={classes.dataEntry}>
        { !adding
          && (
            <div className={classes.dataEntryAddNew}>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => setAdding(true)}
              >
                Add item
                {' '}
                <AddIcon />
              </Button>
            </div>
          )}
        { adding
          && (
            <>
              <ButtonGroup
                color="primary"
                className={classes.dataEntryActions}
              >
                <Button
                  onClick={addNew}
                >
                  <CheckIcon />
                </Button>
                <Button
                  onClick={() => cancelAdd()}
                >
                  <CloseIcon />
                </Button>
              </ButtonGroup>
              <ChplTextField
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!!formik.values.certifiedProductNumber}
                error={formik.touched.name && formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
              <ChplTextField
                id="version"
                name="version"
                label="Version"
                value={formik.values.version}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!!formik.values.certifiedProductNumber}
                error={formik.touched.version && formik.errors.version}
                helperText={formik.touched.version && formik.errors.version}
              />
              <ChplTextField
                id="certified-product-number"
                name="certifiedProductNumber"
                label="Certified Product Number"
                value={formik.values.certifiedProductNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!!(formik.values.name || formik.values.version)}
                error={formik.touched.certifiedProductNumber && formik.errors.certifiedProductNumber}
                helperText={formik.touched.certifiedProductNumber && formik.errors.certifiedProductNumber}
              />
              <ChplTextField
                id="grouping"
                name="grouping"
                label="Grouping"
                value={formik.values.grouping}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.grouping && formik.errors.grouping}
                helperText={formik.touched.grouping && formik.errors.grouping}
              />
            </>
          )}
      </div>
    </Container>
  );
}

export default ChplReliedUponSoftwareEdit;

ChplReliedUponSoftwareEdit.propTypes = {
  onChange: func.isRequired,
  software: arrayOf(reliedUponSoftware).isRequired,
};

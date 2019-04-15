import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Select, TextInput } from '../../components';
import { Category, TransactionInput } from '../../models';

const useStyles = makeStyles({
    dialogPaper: {
        width: 400
    },
    content: {
        display: 'flex',
        flexDirection: 'column'
    },
    selectStyle: {
        width: '100%'
    }
});

export interface TxnDialogProps {
    txn: TransactionInput;
    categories: Array<Category>;
    onSave: (txn: TransactionInput) => void;
    onCancel: () => void;
}

export const TxnDialog = ({
    txn,
    categories,
    onSave,
    onCancel
}: TxnDialogProps) => {
    const classes = useStyles();

    const validationSchema = yup.object().shape({
        txnDate: yup.date().required(),
        payee: yup.string().required(),
        amount: yup.number().required(),
        accountId: yup
            .number()
            .positive()
            .required(),
        categoryId: yup
            .number()
            .positive()
            .required()
    });

    return (
        <Formik
            initialValues={txn}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSave(values);
                setSubmitting(false);
            }}
            render={({ submitForm }) => (
                <Dialog open={true} classes={{ paper: classes.dialogPaper }}>
                    <DialogTitle>
                        {txn.id ? 'Edit Transaction' : 'Create Transaction'}
                    </DialogTitle>
                    <DialogContent className={classes.content}>
                        <Form>
                            <Field
                                name="txnDate"
                                component={TextInput}
                                label="Date"
                                type="date"
                                fullWidth
                            />
                            <Field
                                name="payee"
                                component={TextInput}
                                label="Payee"
                                fullWidth
                            />
                            <Field
                                name="categoryId"
                                component={Select}
                                label="Category"
                                options={categories}
                                className={classes.selectStyle}
                            />
                            <Field
                                name="amount"
                                component={TextInput}
                                label="Amount"
                                fullWidth
                            />
                            <Field
                                name="memo"
                                component={TextInput}
                                label="Memo"
                                fullWidth
                            />
                        </Form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCancel} color="secondary">
                            CANCEL
                        </Button>
                        <Button onClick={submitForm} color="primary">
                            SAVE
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        />
    );
};

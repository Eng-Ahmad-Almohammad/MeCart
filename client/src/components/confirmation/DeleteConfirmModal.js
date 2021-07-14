import { Modal } from 'materialize-css';
import React, { Component } from 'react';

class DeleteConfirmModal extends Component {
  render() {
    return (
      <Modal
        bottomSheet={false}
        fixedFooter={false}
        header="Modal Header"
        open={true}
        {...this.props}
      >
        Are you sure you want to delete this record
      </Modal>
    );
  }
}

export default DeleteConfirmModal;
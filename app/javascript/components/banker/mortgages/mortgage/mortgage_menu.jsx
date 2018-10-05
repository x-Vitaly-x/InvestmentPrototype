import React from 'react'
import { Modal } from "bootstrap.native/dist/bootstrap-native-v4";
import { post } from 'axios'

class MortgageMenu extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      checked: false,
      file: null
    }
  }

  componentDidMount () {
    this.myModalInstance = new Modal(document.querySelector('#mortgage_form'), {});
  }

  changeCheckbox () {
    this.setState({
      checked: !this.state.checked
    })
  }

  getDisabledStatus () {
    if (this.state.file === null) {
      return 'disabled'
    } else {
      return ''
    }
  }

  getChecked () {
    return this.state.checked ? 'checked' : ''
  }

  onChange (e) {
    this.setState({ file: e.target.files[ 0 ] })
  }

  onFormSubmit (e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then(() => {
      alert('New data successfully uploaded.');
      this.props.success();
    }, error => {
      alert('Could not upload new data, check the integrity of your CSV.');
      console.log(error);
    })
  }

  uploadCSV (file) {
    const url = '/api/v1/mortgages/csv_uploads';
    const formData = new FormData();
    formData.append('csv_upload', file);
    formData.append('delete_old_entries', this.state.checkboxChecked + 0); // convert boolean to integer
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content
      }
    };
    return post(url, formData, config)
  }

  openMortgageForm (e) {
    e.preventDefault();
    this.myModalInstance.show();
  }

  render () {
    return (
      <div className='menu mb-4'>
        <form onSubmit={this.onFormSubmit}>
          <button className='btn btn-primary' onClick={e => this.openMortgageForm(e)}>New</button>
          <input type="file" className='ml-2' onChange={this.onChange} accept='text/csv'/>
          <button
            type="submit" className='btn btn-info'
            disabled={this.getDisabledStatus()}>
            Upload CSV
          </button>
          <label className='mr-2 ml-2'>Delete old entries?</label>
          <input
            type='checkbox' className='ml-2'
            checked={this.getChecked()}
            onChange={() => this.changeCheckbox()}/>
        </form>
      </div>
    )
  }
}

export default MortgageMenu

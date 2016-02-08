import React, { Component, PropTypes, } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AvatarEditor from 'react-avatar-editor';
import * as imageActions from 'redux/modules/image';
import { Icon } from 'components';

@connect(
  state => ({
    user: state.auth.user,
    uploading: state.image.uploading,
    uploaded: state.image.uploaded,
    error: state.image.error
  }),
  dispatch => bindActionCreators(imageActions, dispatch)
)
export default class ImageForm extends Component {

  static propTypes = {
    uploading: PropTypes.bool,
    uploaded: PropTypes.bool,
    error: PropTypes.string,
    user: PropTypes.object,
    upload: PropTypes.func,
    initialImage: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      file: '',
      editing: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { error, uploaded } = nextProps;
    const { file } = this.state;
    if (file.length > 0 && error.length <= 0 && uploaded) {
      this.handleReset();
      document.location.reload(true);
    }
  }

  handleScale(event) {
    const scale = parseFloat(event.target.value);
    this.setState({ scale });
  }

  handleChange(event) {
    const that = this;
    const files = event.target.files;

    if (files.length > 0) {
      const reader = new FileReader();
      const file = files[0];

      reader.onload = (upload) => {
        that.setState({ file: upload.target.result });
      };

      reader.readAsDataURL(file);
    }
  }

  handleReset() {
    this.setState({
      scale: 1,
      file: '',
      editing: false
    });
  }

  toggleEditing() {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { user } = this.props;

    const image = this.refs.avatar.getImage();

    this.props.upload({ user: user._id, image });
  }

  render() {
    const { error, initialImage, uploading } = this.props;
    const { editing, file, scale } = this.state;

    return (
      <form onSubmit={::this.handleSubmit} encType="multipart/form-data">

        <h3 className="input-header">Display picture</h3>

        <div style={{ display: 'block', overflow: 'hidden' }}>
          <span className="person__image">
            <img src={initialImage ? initialImage : '/images/person/default.png'} />
          </span>

          {error && <div style={{ color: 'red' }}>{error}</div>}

          {editing ? (
            <button className="button button--warning"
                    onClick={::this.handleReset}
                    disabled={uploading}>
              <Icon name="cross-circle" /> Cancel new image
            </button>
          ) : (
            <button className="button button--success"
                    onClick={::this.toggleEditing}
                    disabled={uploading}>
              <Icon name="upload" /> Upload new image
            </button>
          )}
        </div>

        {editing && (
        <div style={{ display: 'block', padding: '1em' }}>

          <div>Choose a new picture</div>

          <input type="file"
                style={{ display: 'block' }}
                onChange={::this.handleChange}
                accept="image/*"
                 />

          <AvatarEditor
            ref="avatar"
            className="avatar"
            style={{ background: 'white', borderRadius: '5px', margin: '1em 0' }}
            image={file.length > 0 ? file : '/images/person/default.png'}
            width={150}
            height={150}
            border={10}
            borderRadius={150}
            color={[0, 0, 0, 0.6]}
            scale={scale}
            />

          {file.length > 0 && (
            <div style={{ overflow: 'hidden', width: '300px', color: 'white', background: 'grey', borderRadius: '2px', padding: '.5em', marginBottom: '.5em'}}>
              <div style={{ float: 'left', width: '25%'}}>
                <Icon name="magnifier" />{' '}Zoom
              </div>
              <input
                style={{ float: 'left', width: '75%'}}
                name="scale"
                type="range"
                onChange={::this.handleScale}
                min="1"
                max="2"
                step="0.01"
                defaultValue="1"
                />
            </div>
          )}

          <button
                  className="button button--success"
                  onClick={::this.handleSubmit}
                  disabled={file.length <= 0 || uploading}>
            <Icon name={uploading ? 'sync' : 'checkmark-circle'} spin={uploading} /> {uploading ? 'Uploading' : 'Upload'}
          </button>
          {error && <div className="text-danger">{error}</div>}

        </div>
        )}


      </form>
    );
  }
}

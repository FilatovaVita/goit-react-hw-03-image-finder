import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Container } from './ImageGallery.styled';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

export class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
  };
  state = {
    clickedImage: '',
    isModalOpen: false,
    tags: '',
  };
  closeModal = () => this.setState({ clickedImage: '', isModalOpen: false });

  onClickImage = event => {
    this.setState({
      clickedImage: event.target.getAttribute('data'),
      isModalOpen: true,
      tags: event.target.alt,
    });
  };

  render() {
    const { images, isLoading } = this.props;
    const { clickedImage, isModalOpen, tags } = this.state;

    return (
      <>
        <Container onClick={this.onClickImage}>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <ImageGalleryItem
                tags={tags}
                id={id}
                key={id}
                webformatURL={webformatURL}
                largeImage={largeImageURL}
              />
            );
          })}
        </Container>
        {isLoading && <Loader />}
        {isModalOpen && (
          <Modal src={clickedImage} tags={tags} onClose={this.closeModal} />
        )}
      </>
    );
  }
}

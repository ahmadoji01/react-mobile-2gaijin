import React, { Fragment, Component } from 'react';
import { Page, Navbar, NavLeft, List, ListInput, Tab, Tabs, Button, ListItem, TextEditor, Popup, Block, NavRight, Subnavbar, Link, Icon, Searchbar, NavTitle } from 'framework7-react';
import parse from 'html-react-parser';
import "./AddProductPage3.scss";
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import { getCroppedImg, resizeImg } from '../../../services/imageprocessing';

const imagesLimit = 8;

class AddProductPage3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputWidth: 150,
            inputHeight: 150,
            imgPopupOpened: false,
            itemDescription: "",
            nameValid: 0,
            fileList: [],
            imageSrc: null,
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 1,
            croppedAreaPixels: null,
            croppedImage: null,
            isCropping: false,
            imgsToUpload: new Array(imagesLimit),
            thumbImgsToUpload: new Array(imagesLimit),
            activeImgIndex: 0,
            currImgUploaded: 1,
        }
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.showResult = this.showResult.bind(this);
        this.removeStoredImages = this.removeStoredImages.bind(this);
        this.removeAllImages = this.removeAllImages.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onChangeInput = (i) => ({ value }) => {
        console.log(i);
        console.log(value);
    }

    onEditorChange(e) {
        this.setState({ itemDescription: e });
    }

    onCropChange = crop => {
        this.setState({ crop })
    }

    onCropComplete = (croppedArea, croppedAreaPixels) => {
        this.setState({ croppedAreaPixels: croppedAreaPixels });
    }

    onZoomChange = zoom => {
        this.setState({ zoom })
    }
    
    onFileChange = (i) => async e => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            await readFile(file).then(
            res => {
                this.setState({
                    imageSrc: res,
                    crop: { x: 0, y: 0 },
                    zoom: 1,
                    isCropping: true,
                    imgPopupOpened: true,
                    activeImgIndex: i,
                })
            });
        }
    }

    showResult = async () => {
        this.setState({
            imgPopupOpened: false,
        })
        try {
            this.setState({
                isCropping: true,
            })
            const croppedImage = await getCroppedImg(
                this.state.imageSrc,
                this.state.croppedAreaPixels
            )

            this.setState({
                croppedImage,
                isCropping: false,
            });

            var img = await resizeImg(croppedImage, 800, 800);
            var thumbImg = await resizeImg(croppedImage, 300, 300);

            let images = [...this.state.imgsToUpload];
            let i = this.state.activeImgIndex;

            if(!images[i]) {
                this.setState({ currImgUploaded: this.state.currImgUploaded + 1 });
            }

            images[i] = img;
            this.setState({ imgsToUpload: images });

            let thumbImages = [...this.state.thumbImgsToUpload];
            thumbImages[i] = thumbImg;
            this.setState({ thumbImgsToUpload: thumbImages });
        } catch (e) {
          console.error(e)
          this.setState({
            isCropping: false,
          })
        }
    }

    removeAllImages() {
        this.removeStoredImages();
        this.setState({ imgsToUpload: new Array(imagesLimit),
            thumbImgsToUpload: new Array(imagesLimit),
            activeImgIndex: 0,
            currImgUploaded: 1, 
        });
    }

    removeStoredImages() {
        for(var i = 0; i < imagesLimit; i++) {
            var imgKey = "image_" + i;
            var thumbKey = "thumb_" + i;

            localStorage.removeItem(imgKey);
            localStorage.removeItem(thumbKey);
        }
    }

    onButtonClick() {
        if(this.state.currImgUploaded > 1) {
            this.removeStoredImages();
            for(var i = 0; i < (this.state.currImgUploaded - 1); i++) {
                var imgKey = "image_" + i;
                var thumbKey = "thumb_" + i;

                let parts = this.state.imgsToUpload[i].split(';');
                let imageData = parts[1].split(',')[1];
                
                parts = this.state.thumbImgsToUpload[i].split(';');
                let thumbImageData = parts[1].split(',')[1];

                localStorage.setItem(imgKey, imageData);
                localStorage.setItem(thumbKey, thumbImageData);
            }
            localStorage.setItem("image_total", this.state.currImgUploaded-1);

            this.$f7router.navigate("/review-product");
        }
    }

    updateWindowDimensions() {
        this.setState({ inputWidth: (window.innerWidth/2) - 15 });
    }

    componentDidMount() {
        this.updateWindowDimensions();
    }

    componentWillMount() {
        var i = 0;
        let images = new Array();
        let thumbs = new Array();
        for(i = 0; i < imagesLimit; i++) {
            var imgKey = "image_" + i;
            var thumbKey = "thumb_" + i;
            var imgPrefix = "data:image/jpeg;base64,";
            var imgData = localStorage.getItem(imgKey);
            var thumbImgData = localStorage.getItem(thumbKey);
            
            if(imgData) {
                let img = imgPrefix + imgData;
                let thumb = imgPrefix + thumbImgData;

                images.push(img);
                thumbs.push(thumb);
            } else {
                break;
            }
        }
        this.setState({ imgsToUpload: images });
        this.setState({ thumbImgsToUpload: thumbs });
        this.setState({ currImgUploaded: i + 1 });
    }

    render() {

        var imgInputs = new Array();
        var imgPrefix = "data:image/jpeg;base64,";
        for(var i = 0; i < this.state.currImgUploaded; i++) {
            imgInputs[i] = <div className="col-50 img-input-container" style={{ height: `${this.state.inputWidth}px`, width: `${this.state.inputWidth}px` }}>
                <img src={this.state.imgsToUpload[i]} className="img-input-display" style={{ height: `${this.state.inputWidth - 10}px`, width: `${this.state.inputWidth - 10}px`, outline: "1px solid black" }} />
                <p className="img-input-text" style={{ textAlign: "center" }}>+ Upload</p>
                <input type="file" className="img-input" onChange={this.onFileChange(i)} />
            </div>
        }

        return(
            <Page name="search-history" className="page page-category-select">
                <Navbar>
                    <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Choose your item's images</NavTitle>
                </Navbar>
                <div className="container" style={{ paddingTop: 10 }}>
                    <div className="section-title">
                        <h3>Images
                            <a href="#" onClick={this.removeAllImages} className="see-all-link">Remove All</a>
                        </h3>
                    </div>
                    <div className="row">
                        {imgInputs}
                    </div>
                    <div>
                        <Button className="general-btn" style={{color: '#fff'}} onClick={this.onButtonClick} raised fill round>Review Item's Information</Button>
                    </div>
                </div>
                <Popup className="item-desc-popup" opened={this.state.imgPopupOpened}>
                    <Page>
                        <Navbar>
                            <NavLeft>
                                <Link onClick={() => this.setState({ imgPopupOpened: false })}>Cancel</Link>
                            </NavLeft>
                            <NavTitle>Crop Your Image</NavTitle>
                            <NavRight>
                                <Link onClick={this.showResult}>Confirm</Link>
                            </NavRight>
                        </Navbar>
                        <Fragment>
                            <div className="crop-container">
                                <Cropper
                                    image={this.state.imageSrc}
                                    crop={this.state.crop}
                                    zoom={this.state.zoom}
                                    aspect={this.state.aspect}
                                    onCropChange={this.onCropChange}
                                    onCropComplete={this.onCropComplete}
                                    onZoomChange={this.onZoomChange}
                                />
                            </div>
                        </Fragment>
                    </Page>
                </Popup>
            </Page>
        );
    }
}

function readFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
}

export default AddProductPage3;
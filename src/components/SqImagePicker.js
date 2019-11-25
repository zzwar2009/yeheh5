import React from "react";

class SqImagePicker extends React.Component{
    onChange2 = () =>{
        if (this.props.check) {
            if (!this.props.check()) return
        }
        this.fileInput.click()
    }
    changeSfz1 = (e) =>{
        const fileSelectorEl = this.fileInput
        if (fileSelectorEl && fileSelectorEl.files && fileSelectorEl.files.length) {
            const files = fileSelectorEl.files;
            for (let i = 0; i < files.length; i++) {
                this.parseFile(files[i], i);
            }
        }

    }
    parseFile = (file, index) => {
        const reader = new FileReader();
        reader.onload = e => {
            const dataURL = e.target.result;
            if (!dataURL) {
                console.error('fail to load')
                return;
            }

            let orientation = 1;

            this.addImage({
                url: dataURL,
                orientation,
                file,
            })
        };
        reader.readAsDataURL(file);
    }
    addImage = (imgItem) => {
        this.props.onChange(imgItem)
    }
    getOrientation = (file, callback) => {
        const reader = new FileReader();
        reader.onload = e => {
            const view = new DataView(e.target.result);
            if (view.getUint16(0, false) !== 0xffd8) {
                return callback(-2);
            }
            const length = view.byteLength;
            let offset = 2;
            while (offset < length) {
                const marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xffe1) {
                    const tmp = view.getUint32((offset += 2), false);
                    if (tmp !== 0x45786966) {
                        return callback(-1);
                    }
                    const little = view.getUint16((offset += 6), false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    const tags = view.getUint16(offset, little);
                    offset += 2;
                    for (let i = 0; i < tags; i++) {
                        if (view.getUint16(offset + i * 12, little) === 0x0112) {
                            return callback(view.getUint16(offset + i * 12 + 8, little));
                        }
                    }
                } else if ((marker & 0xff00) !== 0xff00) {
                    break;
                } else {
                    offset += view.getUint16(offset, false);
                }
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    }

    render() {
        let borderColor = this.props.borderColor ? this.props.borderColor : 'white';
        let backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : 'white';
        let cream = this.props.backgroundColor ? <img src={require("../res/cream_gray.png")} alt="" style={{display:'block',width:'30px',height:'25px',marginTop:'2px'}}/> : <img src={require("../res/cream_red.png")} alt="" style={{display:'block',width:'30px',height:'25px',marginTop:'2px'}}/>
        const idCardFront = this.props.value ? (
            <img style={{width:'100%',height:'7rem',display:'block'}} src={this.props.value.url} alt=""/>
        ) : (
            <div className="sfz_zm_cream" align="center" style={{backgroundColor:backgroundColor}}>
                {cream}
            </div>
        )
        return(
            <div className="sfz_zm" onClick={this.onChange2} style={{borderColor:borderColor}}>
                <input type="file" accept="image/*" style={{display:'none'}} ref={el => this.fileInput = el} onChange={this.changeSfz1}/>
                {idCardFront}
            </div>

        )

    }
}
export default SqImagePicker;

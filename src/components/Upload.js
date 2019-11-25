import React from "react";
import lrz from "lrz";
import axios from "axios";
import URLPath from "../config/URLPath";
import PropTypes from "prop-types";
import { ActivityIndicator } from "antd-mobile";
import VisibleNode from "./VisibleNode";

const isAndroid = new RegExp("\\bAndroid\\b|\\bAdr\\b", "i").test(
  window.navigator.userAgent
);

class Upload extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.string
  };

  state = {
    status: "default",
    fileUrl: undefined
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { dataSource } = preState;
    if (nextProps.value !== dataSource) {
      if (!nextProps.value || nextProps.value.length === 0) {
        return {
          dataSource: nextProps.value,
          fileUrl: undefined
        };
      }
      return {
        dataSource: nextProps.value,
        fileUrl: nextProps.value
      };
    }
    return null;
  }

  onClickUpload = () => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    this.fileInput.click();
  };

  loading = () => {
    this.setState({
      status: "loading"
    });
  };

  success = payload => {
    const { onSuccess } = this.props;
    this.setState({
      status: "default"
    });
    if (onSuccess) {
      onSuccess(payload);
    }
  };

  fail = payload => {
    const { onFail } = this.props;
    this.setState({
      status: "fail"
    });
    if (onFail) {
      onFail(payload);
    }
  };

  onSelectFile = e => {
    if (this.fileInput && this.fileInput.files && this.fileInput.files.length) {
      this.loading();
      const files = this.fileInput.files;
      this.parseFile(files[0], 0);
      this.fileInput.value = null;
    }
  };

  parseFile = (file, index) => {
    const reader = new FileReader();
    reader.onload = e => {
      const dataURL = e.target.result;
      if (!dataURL) {
        this.fail("加载图片失败");
        return;
      }
      this.setState({
        fileUrl: dataURL
      });
      this.uploadImage({
        url: dataURL,
        orientation: 1,
        file
      });
    };
    reader.readAsDataURL(file);
  };

  uploadImage = imgItem => {
    const { type } = this.props;
    lrz(imgItem.url, { quality: 0.3 })
      .then(rst => {
        let formData = new FormData();
        formData.append("filename", "");
        formData.append("iosfile", rst.base64.split(",")[1]);
        formData.append("oc", 1008888);
        formData.append("fm", "");
        formData.append("type", type);
        formData.append("result", 10);
        return axios({
          method: "post",
          url: URLPath.yunshiIP + "//ImageTransHnandler.ashx",
          data: formData
        });
      })
      .then(res => {
        if (res.data.code != 200) {
          this.fail(res.data);
          return;
        }

        const response = {
          url: res.data.data.url,
          id: res.data.data.Id
        };

        this.success(response);
      });
  };

  render() {
    const {
      style,
      hidden,
      info = "点击上传",
      value,
      children
      //   ...others
    } = this.props;
    const { fileUrl, status } = this.state;
    return (
      <div
        style={{
          display: "flex",
          visibility: hidden ? "hidden" : "visible",
          flexDirection: "column",
          height: 100,
          flex: 1,
          borderRadius: 2,
          overflow: "hidden",
          border: "1px #108ee9 solid",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          color: "#108ee9",
          ...style
        }}
        onClick={this.onClickUpload}
      >
        <input
          type="file"
          accept="image/*"
          // capture="camera"
          style={{ display: "none" }}
          ref={el => (this.fileInput = el)}
          onChange={this.onSelectFile}
        />

        <div
          style={{
            display: status === "loading" ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.2)"
          }}
        >
          <ActivityIndicator animating={status === "loading"} />
        </div>
        {children ? (
          children
        ) : fileUrl || value ? (
          <img
            src={fileUrl || value}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
            }}
            alt=""
          />
        ) : (
          <React.Fragment>
            <div
              style={{
                marginTop: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#108ee9"
              }}
            >
              <img
                src={require("./camera.png")}
                style={{ width: 22, height: 22 }}
                alt=""
              />
            </div>
            <div style={{ marginTop: 10 }}>{info}</div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Upload;

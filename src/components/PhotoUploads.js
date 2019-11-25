import React from "react";
import { Grid } from "antd-mobile";
import Upload from "./Upload";
import PropTypes from "prop-types";

class PhotoUploads extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.string
  };
  state = {
    imgs: ["upload"]
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { dataSource } = preState;
    if (nextProps.value !== dataSource) {
      if (!nextProps.value || nextProps.value.length === 0) {
        return {
          dataSource: nextProps.value,
          imgs: ["upload"]
        };
      }
      const imgs = nextProps.value.split(";");
      return {
        dataSource: nextProps.value,
        imgs: [...imgs, "upload"]
      };
    }
    return null;
  }

  render() {
    const { imgs } = this.state;
    const { onChange, disabled } = this.props;
    return (
      <Grid
        data={imgs}
        columnNum={2}
        square={false}
        hasLine={false}
        activeStyle={false}
        itemStyle={{ height: 120 }}
        renderItem={(dataItem, index) => {
          if (dataItem === "upload") {
            if (disabled) {
              return null;
            }
            return (
              <Upload
                disabled={disabled}
                type={1015}
                style={{ margin: 15, marginTop: 0, marginBottom: 0 }}
                onSuccess={res => {
                  const { imgs } = this.state;
                  imgs.splice(imgs.length - 1, 1, res.url, "upload");
                  this.setState(
                    {
                      imgs: [...imgs]
                    },
                    () => {
                      if (onChange) {
                        onChange(
                          this.state.imgs.slice(0, this.state.imgs.length - 1)
                        );
                      }
                    }
                  );
                }}
              >
                <React.Fragment>
                  <div
                    style={{ marginTop: 10, fontSize: 40, color: "#108ee9" }}
                  >
                    +
                  </div>
                  <div style={{ color: "#108ee9" }}>合同上传</div>
                </React.Fragment>
              </Upload>
            );
          }
          return (
            <div
              style={{
                height: "100%",
                width: "100%",
                boxSizing: "border-box",
                padding: 15,
                paddingTop: 0,
                paddingBottom: 0
              }}
            >
              <img
                src={dataItem}
                style={{
                  height: "100px",
                  width: "100%",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px #108ee9 solid"
                }}
                alt=""
              />
            </div>
          );
        }}
      />
    );
  }
}

export default PhotoUploads;

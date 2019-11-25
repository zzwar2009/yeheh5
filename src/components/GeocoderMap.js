import React from 'react';
import { Marker } from 'react-amap';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { MapView } from './Map';

const styleSearch = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 350,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    flexDirection: 'column',
};


class GeocoderMap extends React.Component {
    static propTypes = {
        onChange: PropTypes.func,
        city: PropTypes.string,
    };

    static defaultProps = {
        onChange: () => {},
        city: '',
    };

    constructor(props) {
        super(props);

        const { city } = this.props;
        const search = city.substr(0, 2);
        const defaultCity = search || '北京';
        this.state = {
            markerPosition: undefined,
            value: '',
            results: [],
            city: defaultCity,
            zoom: 15,
            locale: {
                emptyText: '',
            },
        };

        this.mapPlugins = ['ToolBar'];
        this.amapEvents = {
            created: mapInstance => {
                mapInstance.plugin('AMap.Autocomplete', () => {
                    this.search = new window.AMap.Autocomplete({
                        city: defaultCity,
                        datatype: 'poi',
                        citylimit: true,
                    });
                });
            },
        };
        this.autoComplete = debounce(this.autoComplete, 500);
    }

    componentDidMount() {
    }

    onValueChange = e => {
        this.setState({
            value: e.target.value,
        });
        this.autoComplete(e.target.value);
    };

    onSearch = value => {
        this.setState({
            value,
        });
        this.autoComplete(value);
    };

    onChangeCity = v => {
        this.setState({
            city: v,
        });
        this.search.setCity(v);
    };

    initValue = () => {
        this.setState({
            value: '',
            results: [],
        });
    };

    onClickResult = result => {
        if (!result.location) {
            console.warning('该结果没有返回经纬度');
            return;
        }

        this.setState({
            value: result.district + result.address + result.name,
            zoom: 16,
            markerPosition: {
                latitude: result.location.lat,
                longitude: result.location.lng,
            },
        });
        const { onChange } = this.props;
        onChange(result);
    };

    autoComplete = value => {
        if (!this.search) {
            return;
        }

        this.search.search(value, (status, result) => {
            if (status === 'error') {
                this.setState({
                    results: [],
                });
                return;
            }
            if (status === 'no_data') {
                console.warning('没有查询到数据');
                this.setState({
                    results: [],
                });
                return;
            }
            this.setState({
                results: result.tips,
            });
        });
    };

    render() {
        const { markerPosition, results, value, city, locale, zoom } = this.state;
        const { treeDatas, loading } = this.props;
        return (
            <div style={{ width: '100%', height: '100vh' }}>
                <MapView
                    center={markerPosition}
                    events={this.amapEvents}
                    plugins={this.mapPlugins}
                    city={city}
                    zoom={zoom}
                >
                    {markerPosition && <Marker position={markerPosition} />}
                </MapView>
            </div>
        );
    }
}

export default GeocoderMap;

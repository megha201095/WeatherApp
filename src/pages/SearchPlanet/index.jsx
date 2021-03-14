import React from 'react';
import { connect } from 'react-redux';
import { searchRequest } from '../../actions';
import axios from 'axios';
import Clear from '../../assets/images/Clear.svg';
import Rain from '../../assets/images/Rain.svg';
import Clouds from '../../assets/images/Clouds.svg';

const key = 'pk.4396d6a75ee2d666731d574beffe5446';


class SearchPlanet extends React.Component {
    state = {
        address: null,
        weather: null
    }

    componentDidMount() {
        const that = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=${key}&lat=${lat}&lon=${lon}&format=json`).then(res => {
                    const address = res && res.data && res.data.address;
                    if (address) {
                        that.setState({ address })
                    }
                })
                axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&mode=json&appid=21be1f561b893ea40d0af4169735f8ff`).then(res => {
                    const data = res && res.data;
                    if (data) {
                        that.setState({ weather: data.list })
                    }
                })
            });
        } else {
            alert("Sorry Not available!");
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderWeather = () => {
        const { weather } = this.state;
        if (weather && weather.length) {
            return weather.map((item, index) => {
                let icon = null;
                const detail = item.weather[0];
                switch (detail.main){
                    case 'Clear':
                        icon = Clear;
                        break;
                    case 'Rain':
                        icon = Rain;
                        break;
                    case 'Clouds':
                        icon = Clouds;
                        break;
                }
                
                return <li key={`weather${index}`}>{item.dt_txt} : <img src={icon} style={{height:'35px', width:"35px"}} /> </li>
            })
        }
    }

    handleSearch = (e) => {
        const { count, isAllowed } = this.state;
        const planet = e.target.value;
        if (count < 16 || isAllowed) {
            this.setState({ count: count + 1 }, () => {
                this.props.searchRequest(planet);
            })
        }

    }

    render() {
        const { isLoading, error } = this.props;
        return (
            <div className="container" style={{ paddingTop: '5vh' }}>
                <div className="center">
                    <h1>Weather Forecast</h1>
                    <h4>{this.state.address && `${this.state.address.city}, ${this.state.address.state}`}</h4>
                </div>
                <div className="form-group">
                    <ul>{this.renderWeather()}</ul>
                </div>
                <br />
                {isLoading && (<div>
                    Loading Weather...
                </div>)}
                {error && (<div>
                    {error}
                </div>)}
            </div>
        )
    }

}

const mapStateToProps = ({ search, login }) => ({
    result: search.result,
    isLoading: search.isLoading,
    error: search.error,
    planet: search.planet,
    username: login.user && login.user.name
});

const mapDispatchToProps = dispatch => ({
    searchRequest: (data) => dispatch(searchRequest(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchPlanet);

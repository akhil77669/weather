import React, { Component } from "react";
import { WeatherState } from "../../interfaces/weather";
import "./Weather.css";

export class Weather extends Component<any , WeatherState> {
  constructor(props : any){
    super(props)
    this.state  = {
      citiesList : [
        { city : 'MOSCOW' ,  coordinates : {lat : 55.751244 , lon : 37.618423}  },
        { city : 'OTTAWA' ,  coordinates : {lat : 45.424721 , lon : -75.695000}  },
        { city : 'TOKYO' ,  coordinates : {lat : 35.652832 , lon : 139.839478}  }
      ],
      result : {},
      activeCity : ''
    }
  }


  componentDidMount(){
    this.getCurrentDetails(this.state.citiesList[0])
  }


   updateResults(data : any){
     console.log(data)
    //  const 
     this.setState((prvState) => {
       return {...prvState ,  result : data }
     })
   }

   updateActiveCity (data : any){
     const {city } = data;
    this.setState((prvState) => {
      return {...prvState , activeCity :  city }
    })
   } 


  getCurrentDetails(cityData : any){
  console.log(cityData);
  const {coordinates: {lat ,  lon}} =  cityData
  this.updateActiveCity(cityData);

  const url =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=0bc803e79bc9bbdf6bb6ebcf6f9463c8`
  fetch(url, {method : 'GET'}).then((response =>  response.json())).then((res =>  this.updateResults(res)))
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="main">
            <div className="nav">
              <ul > {this.state.citiesList.map((data :any , index: any) => {
                return (
                  
                  <li key={index}><a className={`nav-link ${this.state?.activeCity === data?.city ? 'active' : ''}`} onClick={() => this.getCurrentDetails(data)} >{data?.city}</a></li>
                )
              } )}
                </ul>
            </div>

            <div className="weather-box">
              <div className="today-weather">
                <p className="mb-20">Today</p>
                <img src="assets/images/weather1.png" alt="weather1" />
                <p className="weather1-info">
                  <span>{this.state?.result?.current?.temp}</span>°F
                </p>
                <p className="weather1-clouds">{this.state?.result?.weather?.weather}</p>
              </div>

              <div className="weather-details">
                <div className="weather-box-small wbs1">
                  <p>Wed</p>
                  <img src="assets/images/weather2.png" alt="weather2" />
                  <p className="weather1-info">
                    <span>19</span>°
                  </p>
                </div>
                <div className="weather-box-small wbs2">
                  <p>Thu</p>
                  <img src="assets/images/weather2.png" alt="weather2" />
                  <p className="weather1-info">
                    <span>20</span>°
                  </p>
                </div>
                <div className="weather-box-small wbs3">
                  <p>Fri</p>
                  <img src="assets/images/weather2.png" alt="weather2" />
                  <p className="weather1-info">
                    <span>21</span>°
                  </p>
                </div>
                <div className="weather-box-small wbs4">
                  <p>Sat</p>
                  <img src="assets/images/weather2.png" alt="weather2" />
                  <p className="weather1-info">
                    <span>22</span>°
                  </p>
                </div>
              </div>

            </div>


          </div>
        </div>
      </div>
    );
  }
}

export default Weather;

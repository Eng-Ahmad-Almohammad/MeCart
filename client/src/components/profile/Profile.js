import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";
import CountUp from "react-countup";
import './style.css'
const Profile = ({ user }) => {
  console.log('useeeeeeeeeer', user)
  return (
    <div
      className="scroll"
      style={{
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        // padding: '20px',
        // paddingTop: 'calc(25vh - 64px)',
        // alignItems: 'center',
        paddingTop: '5vh',
        height: 'calc(100vh - 65px)',
      }}
    >
      <div
        id='wave'
        style={{
          width: '100%',
          backgroundColor: 'rgb(239,110,112)',
          height: '37vh',
          position: 'absolute',
          zIndex: '-1',
          top: '0',
        }}
      >
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <img alt="user avatar" src={user.avatar}
          style={{
            width: '31vh',
            height: '31vh',
            borderRadius: '50%',
            border: 'solid 5px rgb(66,65,65)',

          }}
        ></img>
        <div
          style={{
            width: '50%',
          }}
        >
          <h4
            style={{
              width: '100%',
              margin: '10px 0',
              fontSize: '5vh'
            }}
          >{user.firstName} {user.lastName} </h4>
          <h6
            style={{
              width: '100%',
            }}
          >{user.emails[0]}</h6>
        </div>
      </div>
      <div
        style={{
          margin: '4vh 0',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <div
            className="flo"
            style={{
              backgroundColor: 'rgb(239, 110, 112)',
              borderRadius: '50%',
              width: '15vh',
              height: '15vh',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <h5
              style={{
                textAlign: 'center',
                fontSize: '3.5vh',
                margin: '0',
                color: 'white',
              }}
            >Points</h5>
            <h5
              style={{
                textAlign: 'center',
                fontSize: '3.5vh',
                color: 'white',
              }}>
              <CountUp
                style={{
                  textAlign: 'center',
                }}
                start={0}
                end={user.points}
                duration={2} />
            </h5>
          </div>
          <div
            className="flo"
            style={{
              backgroundColor: 'rgb(239, 110, 112)',
              borderRadius: '50%',
              width: '15vh',
              height: '15vh',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <h5
              style={{
                textAlign: 'center',
                fontSize: '3.5vh',
                margin: '0',
                color: 'white',
              }}
            >Rank</h5>
            <h5
              style={{
                textAlign: 'center',
                fontSize: '3.5vh',
                color: 'white',
              }}>
              <CountUp
                style={{
                  textAlign: 'center',
                }}
                start={0}
                end={user.rank}
                duration={2} />
            </h5>
          </div>

        </div>

        <form>
          <fieldset>
            <legend style={{
              color: 'rgb(239, 110, 112)',
              fontSize: '2vh',
              padding: '0 20px',
            }}>Edit</legend>
            <label for="fname">First name:</label>
            <input type="text" id="fname" name="fname" />
            <label for="lname">Last name:</label>
            <input type="text" id="lname" name="lname" />
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" />
            <label for="password">Current password:</label>
            <input type="password" id="password" name="password" />
            <label for="n_password">New password:</label>
            <input type="password" id="n_password" name="n_password" />
            <label for="n_a_password">Type new password again:</label>
            <input type="password" id="n_a_password" name="n_a_password" />

            <input id="submit" type="submit" value="Apply" />
          </fieldset>
        </form>

      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgb(239,110,112)',
          borderRadius: ''
        }}
      >

      </div>
    </div>
  );
};
function mapStateToProps(state) {
  // console.log('Stattttttte',state);
  return {
    user: state.auth,
  };
}
export default connect(mapStateToProps, actions)(withRouter(Profile));

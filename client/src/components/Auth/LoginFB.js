import React from "react";
import FacebookLogin from "react-facebook-login";

const styles = {
  color: "green",
  height: "500px"
};

class LoginFB extends React.Component {
  state = {
    isLoggedIn: false,
    email: "",
    accessToken: "",
    buttonClicked: false
  };
  responseFacebook = async response => {
    await response;
    this.setState({
      isLoggedIn: true,
      email: response.email,
      accessToken: response.accessToken
    });
    console.log(response);
  };
  componentClicked = () => {
    this.setState({ buttonClicked: true });
  };

  render() {
    const comp = (
      <FacebookLogin
        appId={"793735107631319"}
        autoLoad={false}
        fields="name,email,picture"
        callback={this.responseFacebook}
        cssClass="my-facebook-button-class"
        componentClicked={this.componentClicked}
      />
    );

    return !this.state.isLoggedIn && comp;
  }
}

export default LoginFB;

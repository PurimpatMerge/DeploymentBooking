import { Store } from "react-notifications-component";

export function showAlertFillter(res) {
  return [
    Store.addNotification({
      title: res === "pass" ? "success" : "Failed",
      message: res === "pass" ? "Thank for booking, send to email" : `${res}`,
      type: res === "pass" ? "success" : "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    }),
  ];
}
export function showAlertRegister(res) {
  return [
    Store.addNotification({
      title: res === "pass" ? "success" : "Failed",
      message: res === "pass" ? "Register successed reloading page" : `${res}`,
      type: res === "pass" ? "success" : "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    }),
  ];
}
export function showErrorAlertFillter(res) {
  const a = res.includes("duplicate");
  let message;
  if (res === "valid phone") {
    message = "invalid phone number.";
  } else if (a) {
    message = "username or email been used";
  } else {
    message = "Fill all input";
  }
  return [
    Store.addNotification({
      title: "Failed",
      message: message,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    }),
  ];
}
export function showAlertUserDuplicate(res) {
  return [
    Store.addNotification({
      title: res === "pass" ? "success" : "Failed",
      message:
        res === "pass" ? "please reload page" : `Username or email been used`,
      type: res === "pass" ? "success" : "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    }),
  ];
}
export function showAlertEmail(res) {
  return [
    Store.addNotification({
      title: res === "pass" ? "Success form sent" : "Failed",
      message: res === "pass" ? "check your email" : `Wrong email`,
      type: res === "pass" ? "success" : "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    }),
  ];
}

export function showAlertImage(res) {
  return [
    Store.addNotification({
      title: "Failed",
      message: "Insert slip",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    }),
  ];
}

import { createRoot } from "react-dom/client";
import ToastManager from "./ToastManager";

class Toast {
  //컴포넌트가 될 클래스는 아니고, 토스틀르 띄우는 역할임

  portal = null;

  constructor() {
    const portalId = "toast-portal";
    const portalElement = document.getElementById(portalId);

    if (portalElement) {
      this.portal = portalElement;
      return;
    } else {
      this.portal = document.createElement("div");
      this.portal.id = portalId;
      document.body.appendChild(this.portal);
    }

    createRoot(this.portal).render(
      <ToastManager
        bind={(createToast) => {
          this.createToast = createToast;
        }}
      />
    );
  }

  show(message, duration = 2000) {
    this.createToast(message, duration);
  }
}

export default new Toast();

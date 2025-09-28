import CookieConsent from "react-cookie-consent";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="pingpe-cookie-consent"
      style={{ 
        background: "#2B373B",
        color: "#fff",
        fontSize: "14px"
      }}
      buttonStyle={{ 
        background: "#4CAF50",
        color: "#fff",
        fontSize: "14px",
        borderRadius: "4px"
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "#fff",
        fontSize: "14px",
        border: "1px solid #fff",
        borderRadius: "4px"
      }}
      expires={150}
      onAccept={() => {
        console.log("Cookies accepted");
        // Initialize tracking when accepted
      }}
      onDecline={() => {
        console.log("Cookies declined");
        // Disable tracking when declined
      }}
    >
      We use cookies to enhance your browsing experience and analyze site traffic. 
      By clicking "Accept All", you consent to our use of cookies.{" "}
      <a href="/legal/cookies" style={{ color: "#4CAF50" }}>
        Learn more
      </a>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import GenerateAIModal from "../modals/GenerateAIModal";

const StyledWrapper = styled.div`
  .button {
    width: fit-content;
    display: flex;
    padding: 0.8rem 1rem;
    cursor: pointer;
    gap: 0.4rem;
    font-weight: bold;
    border-radius: 30px;
    text-shadow: 2px 2px 3px rgb(136 0 136 / 50%);
    background: linear-gradient(
        10deg,
        #880088,
        #aa2068,
        #cc3f47,
        #de6f3d,
        #f09f33,
        #de6f3d,
        #cc3f47,
        #aa2068,
        #880088
      )
      no-repeat;
    background-size: 300%;
    color: #fff;
    border: none;
    background-position: left center;
    box-shadow: 0 30px 10px -20px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease;
  }

  .button:hover {
    background-size: 320%;
    background-position: right center;
  }

  .button:hover svg {
    fill: #fff;
  }

  .button svg {
    width: 24px;
    height: 24px;
    fill: #eddd53;
    transition: 0.3s ease;
  }
`;

const AIButton = () => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <>
      <StyledWrapper>
        <button onClick={() => setIsLogoutOpen(true)} className="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
          </svg>
          Get Data With AI
        </button>
      </StyledWrapper>

      <GenerateAIModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
    </>
  );
};

export default AIButton;

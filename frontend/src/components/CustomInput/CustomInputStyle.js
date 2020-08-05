import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  .input {
    display: flex;
    width: 100%;}

    .input-wrapper {
      display: flex;
      flex-grow: 1;
      flex-direction: column;}

      .input-wrapper.layout-checkbox {
        flex-grow: unset;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;}

      .input-wrapper label {
        margin-bottom: 3pt;
        cursor: pointer;}

      .input-wrapper input,
      .input-wrapper textarea,
       .input-wrapper select{
        apperance: none;
        background: none;
        border: none;
        outline: none;
        font: inherit;
        padding: 0 16pt;
        transition: all .12s ease-in-out;}

        .input-wrapper input[type=checkbox] {
          position: absolute;
          width: 120%;
          height: 120%;
          top: -40%;
          left: -40%;
          opacity: 0;}

        .checkbox {
          position: relative;
          margin-right: 6px;}

          .checkbox.is-checked {

            .checkbox.is-checked:after {
              content: '';
              position: absolute;
              height: 7px;
              pointer-events: none;
              width: 9px;
              transform: rotate(-45deg);
              left: 3px;
              top: 3px;}


        .input-wrapper textarea {
          padding-top: 10pt ;
          line-height: 1.6em;}

        .primary .input-wrapper input,
        .primary .input-wrapper textarea,
        .primary .input-wrapper select{
        }

          .primary .input-wrapper input:hover,
          .primary .input-wrapper textarea:hover {
            }

          .primary .input-wrapper input:active,
          .primary .input-wrapper textarea:active,
            .primary .input-wrapper select:active{
            }
            
          .primary .input-wrapper input:focus,
          .primary .input-wrapper textarea:focus,
            .primary .input-wrapper select:focus{
            }

        .secondary .input-wrapper input,
        .secondary .input-wrapper textarea,
          .secondary .input-wrapper select{
          }

          .secondary .input-wrapper input:hover,
          .secondary .input-wrapper textarea:hover,
           
            .secondary .input-wrapper select:hover{
            }

          .secondary .input-wrapper input:active,
          .secondary .input-wrapper textarea:active,
            .secondary .input-wrapper select:active{
            }

          .secondary .input-wrapper input:focus,
          .secondary .input-wrapper textarea:focus,
            .secondary .input-wrapper select:focus{
            }
`;

import styled, { keyframes } from "styled-components"

const spin = keyframes`
  from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`

export const Spinner = styled.div`
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`

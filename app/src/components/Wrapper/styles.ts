import styled from 'styled-components'

export const Container = styled.div.attrs({
	id: 'wrapper'
})`
    width: 100%;
    height: 100%;
    /* border:1px solid red; */
    padding: 10px;
	position: relative;

    display: flex;
	flex-flow: row nowrap;
	align-items: center;
`

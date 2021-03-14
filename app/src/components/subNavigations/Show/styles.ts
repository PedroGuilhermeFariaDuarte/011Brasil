import styled from 'styled-components'
import { Form } from '@unform/web'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    /* border: 1px solid red; */
	z-index: 100;

    display: flex;
    flex-flow: column;
`

export const ContainerHeader = styled.header`
    width: 100%;
    height: 65px;
    border-bottom: 1px solid var(--border-greyice);
    margin-bottom: 30px;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    div#wrapper_header_icon {
        width: 30px;
        height: 30px;
        border-radius: 10px;
        background-color: var(--icon-container-selected);

        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        svg {
            font-size: var(--font-svg-size);
            color: var(--icon-status-selected);
        }
        cursor: pointer;
    }

    span#wrapper_header_title {
        font-family: var(--font-general);
        font-weight: 700;
        font-size: var(--font-title-size);
        color: var(--text-label-blackmidnight);
        margin-left: 10px;
    }
`

export const ContainerSearch = styled(Form)`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    background-color: var(--secondary-backgorubd);
    padding: 2px 10px 2px 10px;
    margin-bottom: 30px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    input {
        flex:1;
        height:100%;
        background:none;
    }

    svg {
        font-size: var(--font-svg-size);
        color: var(--eighth-background);
    }
`

export const ContainerInformation = styled.div`
    width: 100%;
    height: 40px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    span#container_information_title {
        font-family: var(--font-general);
        font-weight: 700;
        font-size: var(--font-description-size);
        color: var(--text-label-blackmidnight);
    }

    svg {
        font-size: var(--font-svg-size);
        color: var(--eighth-background);
    }
`

export const ContainerProduct = styled.div.attrs({
	id: 'container-product'
})`
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding: 2px;

    ::-webkit-scrollbar-track {
            border:none;
            background:none;
            background-color: none;
        }

    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        border-radius: 5px;
        background: none;
    }

    ::-webkit-scrollbar-thumb {
        width:3px;
        height:6px;
        border-radius:5px;
        background-color: #EDEBE9;
    }

    display: flex;
    flex-flow: row wrap;
	justify-content: flex-start;
	align-items: flex-start;
`

export const ProductsContainer = styled.div.attrs({
	className: 'products-container'
})`
    width: 80px;
    height: 80px;
    border-radius: 15px;
    background-color: var(--secondary-backgorubd);
    cursor: pointer;
    margin: 5px;
    overflow: hidden;
	padding: 10px;

    display: flex;
    flex-flow: column ;
    align-items: center;

	& #content {
		width: 100%;
		height: 100%;

		display: flex;
		flex-flow: column ;
		justify-content: center;
	}

	svg {
		font-size: var(--font-svg-size);
		color: var(--icon-status-selected);
	}

    span {
        font-size: var(--font-svg-size);
		margin-left: 20px;
    }

    span.name_product {
        font-size: var(--font-description-chat-name-size);
        color: var(--text-title-greyblack);
    }

    span.other {
        font-size: var(--font-description-size);
		font-weight: lighter;
        color: var(--text-description-blackmidnight);
    }

    &.choose_chat {
        background-color: var(--eleventh-background);

        span {
            color: var(--text-description-greenmorning);
        }
    }
`

export const ContainerLocation = styled.div`
    width: 100%;
    height: auto;
	margin-bottom: 15px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    span.describe-option {
        font-family: var(--font-general);
        font-size: var(--font-description-size);
        color: var(--text-label-blackmidnight);
		user-select: none;
		cursor: default;
        margin-left: 10px;
    }


`

export const ContainerButton = styled.div`
    width: 30px;
    height: 15px;
    border-radius: 15px;
    border: 1px solid var(--border-greyice);
    position: relative;

    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    label {
        width: 12px;
        height: 12px;
        background-color: var(--eleventh-background);
        border-radius: 50%;
        position: absolute;
        transition: 0.3s cubic-bezier(0, 0.31, 0.33, 1.11);
        left: 0px;
        cursor: pointer;
    }

    input {
        display: none;
    }

    input:checked + label {
        background-color: var(--nineth-background);
        left: 17px;
        transition:0.4s cubic-bezier(0, 0.31, 0.33, 1.11);
    }
`

export const ContainerForm = styled(Form).attrs({
	id: 'container-form'
})`
    width: 100%;
    height: 100%;
	border-radius: 10px;
    padding: 10px;
	z-index: 0;
	position: absolute;
	left: 0px;
	opacity: 0;
	background-color: var(--primary-background);
	transition: 0.5s cubic-bezier(0, 0.31, 0.33, 1.11);

    display: flex;
    flex-flow: column;
    align-items: center;

	&.container-form-show {
		left: 320px;
		opacity: 1;
		transition: 0.7s cubic-bezier(0, 0.31, 0.33, 1.11);
	}
`

import styled from 'styled-components'
import { Form } from '@unform/web'

export const Container = styled.div.attrs({
	id: 'subNavigation-container'
})`
    width: 100%;
    height: 100%;
    padding: 10px;
    /* border: 1px solid red; */
    position: relative;

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

    button#call_others_user {
        width: 25px;
        height: 25px;
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

    svg {
        font-size: var(--font-svg-size);
        color: var(--eighth-background);
    }
`

export const ContainerProduct = styled(Form).attrs({
	id: 'container-product'
})`
    width: 100%;
    height: 100%;
    /* border:1px solid red; */
    padding: 2px;

    display: flex;
    flex-flow: column;
    align-items: center;
`

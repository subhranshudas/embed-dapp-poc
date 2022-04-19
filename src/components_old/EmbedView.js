import React from 'react';
import styled from 'styled-components';
import { Open as OpenIcon } from '@styled-icons/fluentui-system-filled/Open'
import { Close as CloseIcon } from '@styled-icons/evil/Close';
import Notifications from './Notifications';

// change later to config
const epnsLink = 'https://app.epns.io/';

const EmbedView = ({ headerText = 'Notifications' }) => {
    return (
        <ViewContainer>
            <ViewHeader>
              <HeaderLink href={epnsLink} target="_blank" title={epnsLink}>
                  <span>{headerText}</span>
                  <OpenIcon className="view-link-icon" size="30"/>
              </HeaderLink>

              <CloseIcon className="view-close-icon" size="30"/>
            </ViewHeader>
            <ViewBody>
                <Notifications />
            </ViewBody>
        </ViewContainer>
    );
};

const ViewContainer = styled.div`
    background-color: #f7fafc;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const ViewHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    background-color: #ffffff;
    min-height: 4rem;
    border-bottom: 1px solid #e4e8ea;

    & svg {
        cursor: pointer;
    }

    & svg.view-close-icon {
       transition: transform .2s;
    }

    & svg.view-close-icon:hover {
        color: #1e1e1eb5;
        transform: scale(1.2);
    }
`;

const ViewBody = styled.main`
    flex-grow: 1;
    overflow-y: auto;
    padding: 15px;
`;

const HeaderLink = styled.a`
    color: #000;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.25rem;
    font-weight: bold;

    & svg {
        margin-left: 5px;
    }

    &:hover {
        color: #2b43d8;
    }
`

export default EmbedView;
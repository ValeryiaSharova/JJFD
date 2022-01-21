import React from "react";
import CollapseWrapper from "../common/collapse";
import PropTypes from "prop-types";

const pStyle = {
    color: "red",
    display: "inline"
};
const divStyle = {
    display: "inline"
};

const ParentComponent = ({ children }) => {
    return React.Children.map(children, (child, index) => {
        const config = {
            ...child.props,
            style: divStyle
        };
        return React.cloneElement(
            child,
            config,
            <p style={pStyle}>{index + 1}</p>
        );
    });
};

ParentComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

const Component = ({ style, children }) => {
    return (
        <div>
            {children} <div style={style}>Компонент списка</div>
        </div>
    );
};

Component.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    style: PropTypes.string
};

const ChildrenExercise = () => {
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть компоненты Списка. Вам необходимо к каждому из них
                добавить порядковый номер, относительно того, как они
                располагаются на странице. Вы можете использовать как{" "}
                <code>React.Children.map</code> так и{" "}
                <code>React.Children.toArray</code>
            </p>
            <ParentComponent>
                <Component />
                <Component />
                <Component />
            </ParentComponent>
        </CollapseWrapper>
    );
};

export default ChildrenExercise;

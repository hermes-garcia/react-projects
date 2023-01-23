import PropTypes from "prop-types";

const name = 'Hermes';
export const FirstApp = ({title, subtitle}) => {
    return (
        <>
            <h1 data-testid="test-title">{title}</h1>
            <h3>{subtitle}</h3>
            <h4>{subtitle}</h4>
        </>
    )
}

FirstApp.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
}

FirstApp.defaultProps = {
    //title: "Hi, my name is Hermes",
    subtitle: "I'm a developer"
}
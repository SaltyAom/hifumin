import './loader.styl'

const Loader = () => (
    <div className="loader">
        <svg className="circular" viewBox="25 25 50 50">
            <circle
                className="path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke-width="4"
                stroke-miterlimit="10"
            />
        </svg>
    </div>
)

export default Loader
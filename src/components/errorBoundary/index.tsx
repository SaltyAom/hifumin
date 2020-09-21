import { Component } from "react"

class ErrorBoundary extends Component {
	static getDerivedStateFromError(error) {
		console.log(error)
	}

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo)
	}

	render() {
		return this.props.children
	}
}

export default ErrorBoundary

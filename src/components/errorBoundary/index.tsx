import { Component } from "react"

class ErrorBoundary extends Component {
	static getDerivedStateFromError(error: any) {
		console.log(error)
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.log(error, errorInfo)
	}

	render() {
		return this.props.children
	}
}

export default ErrorBoundary

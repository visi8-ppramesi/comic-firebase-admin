//disable-eslint
const devtools = {
	isOpen: false,
	orientation: undefined
}

const threshold = 160
// eslint-disable-next-line no-undef
const emitEvent = (isOpen, orientation) => {
	globalThis.dispatchEvent(new globalThis.CustomEvent('devtoolschange', {
		detail: {
			isOpen,
			orientation
		}
	}))
}

// eslint-disable-next-line no-undef
const main = ({ emitEvents = true } = {}) => {
	// eslint-disable-next-line no-undef
	const widthThreshold = globalThis.outerWidth - globalThis.innerWidth > threshold
	const heightThreshold = globalThis.outerHeight - globalThis.innerHeight > threshold
	const orientation = widthThreshold ? 'vertical' : 'horizontal'

	if (
		// eslint-disable-next-line no-undef
		!(heightThreshold && widthThreshold) &&
		// eslint-disable-next-line no-tabs
		// eslint-disable-next-line no-undef
		((globalThis.Firebug && globalThis.Firebug.chrome && globalThis.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
	) {
		if ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents) {
			emitEvent(true, orientation)
		}

		devtools.isOpen = true
		devtools.orientation = orientation
	} else {
		if (devtools.isOpen && emitEvents) {
			emitEvent(false, undefined)
		}

		devtools.isOpen = false
		devtools.orientation = undefined
	}
}

main({ emitEvents: false })
setInterval(main, 500)

export default devtools

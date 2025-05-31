import classNames from "classnames";
import { useEffect, useMemo, type CSSProperties, type JSX } from "react";
import { createRoot, type Root } from "react-dom/client";
import { useMap } from "react-leaflet";
import Leaflet from "leaflet";

export type ButtonProps = {
	icon: React.ReactNode;
	title?: string;
	disable?: boolean;
	onClick?: (map: Leaflet.Map, event?: React.MouseEvent<HTMLAnchorElement>) => void;
	style?: CSSProperties;
	className?: string;
};

export type ButtonControlProps = {
	buttons: ButtonProps | ButtonProps[];
	onClick?(map: Leaflet.Map, index: number, event?: React.MouseEvent<HTMLAnchorElement>): void;
	className?: string;
};

interface ButtonControlOptions {
	props: ButtonControlProps;
	root?: Root;
	createButton(map: Leaflet.Map, button: ButtonProps, index: number): JSX.Element;
	setButtons(map: Leaflet.Map, buttons: ButtonProps | ButtonProps[]): void;
	onAdd(): HTMLDivElement;
}

export const Button = Leaflet.Control.extend<ButtonControlOptions>({
	props: {
		buttons: [],
	},

	createButton(map: Leaflet.Map, button: ButtonProps, index: number) {
		return (
			<a
				role="button"
				tabIndex={0}
				key={index}
				title={button.title}
				aria-label={button.title}
				style={{ cursor: button.disable ? "default" : "pointer", ...button.style }}
				className={classNames("leaflet-control-custom", "leaflet-control-custom-icon", { "leaflet-disabled": button.disable }, button.className)}
				onClick={event => {
					event.preventDefault();
					event.stopPropagation();
					if (!button.disable) {
						this.props.onClick?.(map, index, event);
						button.onClick?.(map, event);
					}
				}}
			>
				{button.icon}
			</a>
		);
	},

	setButtons(map: Leaflet.Map, buttons: ButtonProps | ButtonProps[]) {
		let newButtons: JSX.Element | JSX.Element[];

		if (Array.isArray(buttons)) {
			newButtons = buttons.map((button, index) => {
				return this.createButton(map, button, index);
			});
		} else {
			newButtons = this.createButton(map, buttons, 0);
		}

		if (this.root) {
			this.root.render(newButtons);
		}
	},

	onAdd(): HTMLDivElement {
		const container = Leaflet.DomUtil.create("div", classNames("leaflet-control-custom", "leaflet-bar", this.props.className));
		this.root = createRoot(container);

		return container;
	},
});

export default function ButtonControl(props: Leaflet.ControlOptions & ButtonControlProps) {
	const map = useMap();
	const length = Array.isArray(props.buttons) ? props.buttons.length : 1;

	const control = useMemo(() => {
		const position = props.position ?? "topleft";
		return new Button({ position });
	}, [props.position]);

	useEffect(() => {
		if (length) {
			control.addTo(map);
		}

		return function () {
			control.remove();
		};
	}, [control, length, map]);

	useEffect(() => {
		control.props = props;
		if (length) {
			control.setButtons(map, props.buttons);
		}
	}, [control, props, length, map]);

	return null;
}

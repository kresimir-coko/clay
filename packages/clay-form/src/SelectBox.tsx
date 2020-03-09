/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * © 2019 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import classNames from 'classnames';
import React from 'react';

function arrayMove(arr: Array<any>, oldIndex: number, newIndex: number) {
	arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);

	return arr;
}

function reorderUp(array: Array<any>, selectedIndexes: Array<number>) {
	let clonedArray = [...array];

	for (let i = 0; i < selectedIndexes.length; i++) {
		const item = selectedIndexes[i];

		if (item === 0) {
			return clonedArray;
		}

		clonedArray = arrayMove(clonedArray, item, item - 1);
	}

	return clonedArray;
}

function reorderDown(array: Array<any>, selectedIndexes: Array<number>) {
	let clonedArray = [...array];

	for (let i = 0; i < selectedIndexes.length; i++) {
		const item = selectedIndexes[i];

		if (selectedIndexes.includes(clonedArray.length - 1)) {
			return clonedArray;
		}

		clonedArray = arrayMove(clonedArray, item, item + 1);
	}

	return clonedArray;
}

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	buttonAlignment?: string;
	items: Array<any>;
	label?: string;
	multiple?: boolean;
	onChange: any;
	onItemsChange?: any;
	selectedIndexes?: any;
	size?: number;
	showArrows?: boolean;
	value: any;
	spritemap?: string;
}

const ClaySelectBox: React.FunctionComponent<IProps> = ({
	buttonAlignment = 'right',
	className,
	items,
	label,
	multiple,
	onChange,
	onItemsChange,
	showArrows,
	size,
	spritemap,
	value,
}) => {
	const selectedIndexes = items.reduce(
		(acc: any, item: any, index: number) => {
			if (value.includes(item.value)) {
				return [...acc, index];
			}

			return acc;
		},
		[]
	);

	return (
		<div className={classNames(className, 'form-group')}>
			{label && <label className="reorder-label">{label}</label>}

			<div
				className={`clay-reorder clay-reorder-footer-${buttonAlignment}`}
			>
				<select
					className="form-control form-control-inset"
					multiple={multiple}
					onChange={event => {
						const selectedItems = [...event.target.options]
							.filter(({selected}) => selected)
							.map(item => item.value);

						onChange(selectedItems);
					}}
					size={size}
					value={value}
				>
					{items.map((option: any) => (
						<option
							className="reorder-option"
							key={option.value}
							value={option.value}
						>
							{option.label}
						</option>
					))}
				</select>

				<div className="clay-reorder-underlay form-control" />

				{showArrows && (
					<div className="clay-reorder-footer">
						<ClayButton.Group className="reorder-order-buttons">
							<ClayButtonWithIcon
								className="reorder-button reorder-button-up"
								disabled={value.length ? false : true}
								displayType="secondary"
								onClick={() =>
									onItemsChange(
										reorderUp(items, selectedIndexes)
									)
								}
								spritemap={spritemap}
								symbol="caret-top"
							/>

							<ClayButtonWithIcon
								className="reorder-button reorder-button-down"
								disabled={value.length ? false : true}
								displayType="secondary"
								onClick={() =>
									onItemsChange(
										reorderDown(items, selectedIndexes)
									)
								}
								spritemap={spritemap}
								symbol="caret-bottom"
							/>
						</ClayButton.Group>
					</div>
				)}
			</div>
		</div>
	);
};

export default ClaySelectBox;

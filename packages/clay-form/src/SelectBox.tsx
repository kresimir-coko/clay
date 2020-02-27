/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * © 2019 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {ClayInput} from '.';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import classNames from 'classnames';
import React from 'react';

// const newItemsB = swapArrayItems([items[1], items[0]], 0);

// const [one, zero] = swapArrayItems([items[1], items[0]], 0);
// setNewItems([zero, one]);

function reorderUp(array: Array<any>, selectedIndexes: Array<number>) {
	const arrayToReorder = [...array];

	selectedIndexes.map((index: number) => {
		if (index === 0) {
			return;
		}

		arrayToReorder.splice(index - 1, 0, arrayToReorder[index]);
		arrayToReorder.splice(index + 1, 1);
	});

	return arrayToReorder;
}

function reorderDown(array: Array<any>, selectedIndexes: Array<number>) {
	const arrayToReorder = [...array];

	selectedIndexes.map((index: number) => {
		if (index === arrayToReorder.length) {
			return;
		}

		arrayToReorder.splice(index + 2, 0, arrayToReorder[index]);
		arrayToReorder.splice(index, 1);
	});

	return arrayToReorder;
}

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
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
	const [options, setOptions] = React.useState(items);
	const [selected, setSelected] = React.useState<Array<string>>([]);

	const selectedIndexes = options.reduce(
		(acc: any, item: any, index: number) => {
			if (selected.includes(item.value)) {
				return [...acc, index];
			}

			return acc;
		},
		[]
	);

	return (
		<ClayInput.Group className="input-move-box">
			{label && <label>{label}</label>}

			<select
				multiple={multiple}
				onChange={event => {
					const newSelected = [...event.target.options]
						.filter(({selected}) => selected)
						.map(item => item.value);

					setSelected(newSelected);
					onChange(newSelected);
				}}
				size={size}
				value={value || selected}
			>
				{options.map((option: any) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>

			{showArrows && (
				<ClayButton.Group className="order-buttons">
					<ClayButtonWithIcon
						disabled={value.length ? false : true}
						displayType="secondary"
						onClick={() => {
							const reordered = reorderUp(
								options,
								selectedIndexes
							);

							setOptions(reordered);
						}}
						spritemap={spritemap}
						symbol="caret-top"
					/>
					<ClayButtonWithIcon
						disabled={value.length ? false : true}
						displayType="secondary"
						onClick={() => {
							const reordered = reorderDown(
								options,
								selectedIndexes
							);

							setOptions(reordered);
						}}
						spritemap={spritemap}
						symbol="caret-bottom"
					/>
				</ClayButton.Group>
			)}
		</ClayInput.Group>
	);
};

export default ClaySelectBox;

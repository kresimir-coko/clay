/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * © 2019 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {ClaySelectBox} from '.';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import classNames from 'classnames';
import React from 'react';

function swapArrayItems(
	arrays: [Array<any>, Array<any>],
	selectedIndexes: Array<number>
) {
	const [sourceArray, targetArray] = arrays;

	const newTargetArray = [...targetArray];

	const newSourceArray: Array<any> = sourceArray.filter(
		(item: number, index: number) => {
			if (selectedIndexes.includes(index)) {
				newTargetArray.push(item);

				return false;
			}

			return true;
		}
	);

	return [newSourceArray, newTargetArray];
}

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	left: {
		items: Array<any>;
		label: string;
		onChange: any;
		onSelectChange: any;
		selected: Array<string>;
	};
	right: {
		items: Array<any>;
		label: string;
		onChange: any;
		onSelectChange: any;
		selected: Array<string>;
	};
	size?: number;
	spritemap?: string;
}

const ClayInputMoveBoxes: React.FunctionComponent<IProps> = ({
	className,
	left,
	right,
	size,
	spritemap,
	...otherProps
}) => {
	const selectedIndexesLeft = left.items.reduce(
		(acc: any, item: any, index: number) => {
			if (left.selected.includes(item.value)) {
				return [...acc, index];
			}

			return acc;
		},
		[]
	);

	const selectedIndexesRight = right.items.reduce(
		(acc: any, item: any, index: number) => {
			if (right.selected.includes(item.value)) {
				return [...acc, index];
			}

			return acc;
		},
		[]
	);

	return (
		<div
			{...otherProps}
			className={classNames(className, 'input-move-boxes')}
		>
			<ClaySelectBox
				className="select-box-left"
				items={left.items}
				label={left.label}
				multiple
				onChange={left.onSelectChange}
				onItemsChange={left.onChange}
				showArrows
				size={size}
				spritemap={spritemap}
				value={left.selected}
			/>

			<ClayButton.Group className="transfer-buttons">
				<ClayButtonWithIcon
					className="transfer-button-ltr"
					disabled={!left.selected.length}
					displayType="secondary"
					onClick={() => {
						const [arrayLeft, arrayRight] = swapArrayItems(
							[left.items, right.items],
							selectedIndexesLeft
						);

						left.onChange(arrayLeft);
						right.onChange(arrayRight);
						right.onSelectChange([]);
					}}
					spritemap={spritemap}
					symbol="caret-right"
				/>

				<ClayButtonWithIcon
					className="transfer-button-rtl"
					disabled={!right.selected.length}
					displayType="secondary"
					onClick={() => {
						const [arrayRight, arrayLeft] = swapArrayItems(
							[right.items, left.items],
							selectedIndexesRight
						);

						left.onChange(arrayLeft);
						right.onChange(arrayRight);
						right.onSelectChange([]);
					}}
					spritemap={spritemap}
					symbol="caret-left"
				/>
			</ClayButton.Group>

			<ClaySelectBox
				className="select-box-right"
				items={right.items}
				label={right.label}
				multiple
				onChange={right.onSelectChange}
				onItemsChange={right.onChange}
				size={size}
				value={right.selected}
			/>
		</div>
	);
};

export default ClayInputMoveBoxes;

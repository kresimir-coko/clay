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
		onChange: () => void;
		onSelectChange: () => void;
		selected: [];
	};
	right: {
		items: Array<any>;
		label: string;
		onChange: () => void;
		onSelectChange: () => void;
		selected: [];
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
	const [itemsLeft, setItemsLeft] = React.useState(left.items);
	const [itemsRight, setItemsRight] = React.useState(right.items);
	const [selectedLeft, setSelectedLeft] = React.useState<Array<string>>(
		left.selected
	);
	const [selectedRight, setSelectedRight] = React.useState<Array<string>>(
		right.selected
	);

	const selectedIndexesLeft = itemsLeft.reduce(
		(acc: any, item: any, index: number) => {
			if (selectedLeft.includes(item.value)) {
				return [...acc, index];
			}

			return acc;
		},
		[]
	);

	const selectedIndexesRight = itemsRight.reduce(
		(acc: any, item: any, index: number) => {
			if (selectedRight.includes(item.value)) {
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
				items={itemsLeft}
				label={left.label}
				multiple
				onChange={(items: any) => setSelectedLeft(items)}
				onItemsChange={setItemsLeft}
				showArrows
				size={size}
				spritemap={spritemap}
				value={selectedLeft}
			/>

			<ClayButton.Group className="transfer-buttons">
				<ClayButtonWithIcon
					disabled={!selectedLeft.length}
					displayType="secondary"
					onClick={() => {
						const [arrayLeft, arrayRight] = swapArrayItems(
							[itemsLeft, itemsRight],
							selectedIndexesLeft
						);

						setItemsLeft(arrayLeft);
						setItemsRight(arrayRight);
						setSelectedLeft([]);
					}}
					spritemap={spritemap}
					symbol="caret-right"
				/>

				<ClayButtonWithIcon
					disabled={!selectedRight.length}
					displayType="secondary"
					onClick={() => {
						const [arrayRight, arrayLeft] = swapArrayItems(
							[itemsRight, itemsLeft],
							selectedIndexesRight
						);

						setItemsLeft(arrayLeft);
						setItemsRight(arrayRight);
						setSelectedRight([]);
					}}
					spritemap={spritemap}
					symbol="caret-left"
				/>
			</ClayButton.Group>

			<ClaySelectBox
				items={itemsRight}
				label={right.label}
				multiple
				onChange={(items: any) => setSelectedRight(items)}
				onItemsChange={setItemsLeft}
				size={size}
				value={selectedRight}
			/>
		</div>
	);
};

export default ClayInputMoveBoxes;

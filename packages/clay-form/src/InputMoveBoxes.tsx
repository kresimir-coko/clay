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

	const clonedSourceArray = [...sourceArray];
	const clonedTargetArray = [...targetArray];

	const removedItems: Array<any> = selectedIndexes.map((index: number) => {
		clonedSourceArray.splice(index, 1);
	});

	removedItems.map(item => {
		clonedTargetArray.push(item);
	});

	console.log('arrays: ', arrays);
	console.log('selectedIndexes: ', selectedIndexes);
	console.log('removedItems: ', removedItems);

	return [clonedSourceArray, clonedTargetArray];
}

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	leftSelectLabel?: string;
	options: Array<any>;
	size?: number;
	rightSelectLabel?: string;
	spritemap?: string;
}

const ClayInputMoveBoxes: React.FunctionComponent<IProps> = ({
	className,
	leftSelectLabel,
	options,
	rightSelectLabel,
	size,
	spritemap,
	...otherProps
}) => {
	const [itemsLeft, setItemsLeft] = React.useState(options[0]);
	const [itemsRight, setItemsRight] = React.useState(options[1]);
	const [selectedLeft, setSelectedLeft] = React.useState<Array<string>>([]);
	const [selectedRight, setSelectedRight] = React.useState<Array<string>>([]);

	const selectedIndexesLeft = options.reduce(
		(acc: any, item: any, index: number) => {
			if (selectedLeft.includes(item.value)) {
				return [...acc, index];
			}

			return acc;
		},
		[]
	);

	const selectedIndexesRight = options.reduce(
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
				label={leftSelectLabel}
				multiple
				onChange={(items: any) => setSelectedLeft(items)}
				showArrows
				size={size}
				spritemap={spritemap}
				value={selectedLeft}
			/>

			<ClayButton.Group className="transfer-buttons">
				<ClayButtonWithIcon
					displayType="secondary"
					onClick={() => {
						const [arrayLeft, arrayRight] = swapArrayItems(
							[itemsLeft, itemsRight],
							selectedIndexesLeft
						);

						setItemsLeft(arrayLeft);
						setItemsRight(arrayRight);
					}}
					spritemap={spritemap}
					symbol="caret-right"
				/>

				<ClayButtonWithIcon
					displayType="secondary"
					onClick={() => {
						const [arrayRight, arrayLeft] = swapArrayItems(
							[itemsRight, itemsLeft],
							selectedIndexesRight
						);

						setItemsLeft(arrayLeft);
						setItemsRight(arrayRight);
					}}
					spritemap={spritemap}
					symbol="caret-left"
				/>
			</ClayButton.Group>

			<ClaySelectBox
				items={itemsRight}
				label={rightSelectLabel}
				multiple
				onChange={(items: any) => setSelectedRight(items)}
				size={size}
				value={selectedRight}
			/>
		</div>
	);
};

export default ClayInputMoveBoxes;

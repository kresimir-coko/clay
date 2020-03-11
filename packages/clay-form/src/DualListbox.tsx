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

import ClaySelectBox from './SelectBox';

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
	items: Array<any>;
	onChange: any;
	left: {
		label: string;
		onSelectChange: any;
		selected: Array<string>;
	};
	right: {
		label: string;
		onSelectChange: any;
		selected: Array<string>;
	};
	size?: number;
	spritemap?: string;
}

const ClayDualListbox: React.FunctionComponent<IProps> = ({
	className,
	items,
	left,
	onChange,
	right,
	size,
	spritemap,
	...otherProps
}) => {
	const [leftItems, rightItems] = items;

	const selectedIndexesLeft = leftItems.reduce(
		(acc: any, item: any, index: number) => {
			if (left.selected.includes(item.value)) {
				return [...acc, index];
			}

			return acc;
		},
		[]
	);

	const selectedIndexesRight = rightItems.reduce(
		(acc: any, item: any, index: number) => {
			if (right.selected.includes(item.value)) {
				return [...acc, index];
			}

			return acc;
		},
		[]
	);

	return (
		<div {...otherProps} className={classNames(className, 'form-group')}>
			<div className="clay-dual-listbox">
				<ClaySelectBox
					className="clay-dual-listbox-item clay-dual-listbox-item-expand listbox-left"
					items={leftItems}
					label={left.label}
					multiple
					onChange={left.onSelectChange}
					onItemsChange={(newLeftItems: any) =>
						onChange([newLeftItems, rightItems])
					}
					showArrows
					size={size}
					spritemap={spritemap}
					value={left.selected}
				/>

				<ClayButton.Group className="clay-dual-listbox-actions clay-dual-listbox-item">
					<ClayButtonWithIcon
						className="transfer-button-ltr"
						data-testid="ltr"
						disabled={!left.selected.length}
						displayType="secondary"
						onClick={() => {
							const [arrayLeft, arrayRight] = swapArrayItems(
								[leftItems, rightItems],
								selectedIndexesLeft
							);

							onChange([arrayLeft, arrayRight]);
						}}
						spritemap={spritemap}
						symbol="caret-right"
					/>

					<ClayButtonWithIcon
						className="transfer-button-rtl"
						data-testid="rtl"
						disabled={!right.selected.length}
						displayType="secondary"
						onClick={() => {
							const [arrayRight, arrayLeft] = swapArrayItems(
								[rightItems, leftItems],
								selectedIndexesRight
							);

							onChange([arrayLeft, arrayRight]);
						}}
						spritemap={spritemap}
						symbol="caret-left"
					/>
				</ClayButton.Group>

				<ClaySelectBox
					className="clay-dual-listbox-item clay-dual-listbox-item-expand listbox-right"
					items={rightItems}
					label={right.label}
					multiple
					onChange={right.onSelectChange}
					onItemsChange={(newRightItems: any) =>
						onChange([leftItems, newRightItems])
					}
					size={size}
					value={right.selected}
				/>
			</div>
		</div>
	);
};

export default ClayDualListbox;

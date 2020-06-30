/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {ClayButtonWithIcon} from '@clayui/button';
import ClayIcon from '@clayui/icon';
import {LinkOrButton} from '@clayui/shared';
import classNames from 'classnames';
import React from 'react';

import Item from './Item';

type TItem = {
	className?: string;
	childIndex?: number;
	href?: string;
	items?: Array<TItem>;
	onClick?: () => void;
	symbol?: string;
	title?: string;
};

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
	current?: boolean;
	items?: Array<TItem>;
	spritemap?: string;
	title: string;
}

function gatherMenus(items: Array<TItem>, index = 0, parentHeader = '') {
	items = [...items];

	let menus = [{index, items, parentHeader}];

	items.forEach((item) => {
		if (item.items) {
			item.childIndex = index + 1;

			menus = [
				...menus,
				...gatherMenus(item.items, index + 1, item.title),
			];
		}
	});

	return menus;
}

const ClayDrilldown: React.FunctionComponent<IProps> & {
	Item: typeof Item;
} = ({children, className, items, spritemap, ...otherProps}) => {
	const [activeMenu, setActiveMenu] = React.useState(0);
	const [nextMenu, setNextMenu] = React.useState(null);
	const [transform, setTransform] = React.useState(false);

	const handleNext = (newActive: number) => {
		setNextMenu(newActive);
	};

	const handlePrev = (newActive: number) => {
		setNextMenu(newActive);
	};

	React.useLayoutEffect(() => {
		if (nextMenu !== null) {
			setTransform(true);
		}
	}, [nextMenu]);

	return (
		<div {...otherProps} className={classNames('drilldown', className)}>
			<div className="drilldown-inner" style={{overflow: 'visible'}}>
				{children
					? children
					: gatherMenus(items).map((menu, i) => (
							<div
								className={classNames('drilldown-item', {
									'drilldown-current':
										nextMenu === i || activeMenu === i,
									'drilldown-transition transitioning':
										activeMenu === i || nextMenu === i,
								})}
								key={i}
								onTransitionEnd={() => {
									if (nextMenu === i) {
										setActiveMenu(nextMenu);

										setNextMenu(null);

										setTransform(false);
									}
								}}
								style={
									transform && nextMenu !== null
										? {
												transform: `translateX(-100%)`,
										  }
										: {}
								}
							>
								<div className="drilldown-item-inner">
									{menu.parentHeader && (
										<>
											<div className="dropdown-header">
												<ClayButtonWithIcon
													className="component-action dropdown-item-indicator-start"
													onClick={() =>
														handlePrev(
															menu.index - 1
														)
													}
													spritemap={spritemap}
													symbol="angle-left"
												/>

												<span className="dropdown-item-indicator-text-start">
													{menu.parentHeader}
												</span>
											</div>

											<div className="dropdown-divider" />
										</>
									)}

									{menu.items && (
										<ul className="nav nav-stacked">
											{menu.items.map(
												(
													{
														childIndex,
														className,
														items: childItems,
														symbol,
														title,
														...other
													},
													j
												) => (
													<li key={j}>
														<LinkOrButton
															{...other}
															buttonDisplayType="unstyled"
															className={classNames(
																'dropdown-item',
																className
															)}
															onClick={() => {
																handleNext(
																	childIndex
																);
															}}
														>
															{symbol && (
																<span className="dropdown-item-indicator-start">
																	<ClayIcon
																		spritemap={
																			spritemap
																		}
																		symbol={
																			symbol
																		}
																	/>
																</span>
															)}

															<span className="dropdown-item-indicator-text-end">
																{title}
															</span>

															{childItems && (
																<span className="dropdown-item-indicator-end">
																	<ClayIcon
																		spritemap={
																			spritemap
																		}
																		symbol="angle-right"
																	/>
																</span>
															)}
														</LinkOrButton>
													</li>
												)
											)}
										</ul>
									)}
								</div>
							</div>
					  ))}
			</div>
		</div>
	);
};

ClayDrilldown.Item = Item;

export default ClayDrilldown;

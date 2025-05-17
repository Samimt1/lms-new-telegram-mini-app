"use client";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import {
  CogIcon,
  CheckBadgeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const GamificationSettings = () => {
  // Badges System State
  const [badges, setBadges] = useState([
    {
      id: 1,
      name: "Fast Learner",
      icon: "🏅",
      criteria: "Complete 3 courses in a week",
      xp: 100,
      enabled: true,
    },
    {
      id: 2,
      name: "Perfect Score",
      icon: "⭐",
      criteria: "Score 100% on any quiz",
      xp: 150,
      enabled: true,
    },
  ]);

  // Points System State
  const [pointsConfig, setPointsConfig] = useState({
    xpPerLesson: 10,
    xpPerQuiz: 20,
    xpPerCourseCompletion: 100,
    redeemablePoints: true,
    pointToCurrencyRatio: 0.1,
  });

  // Leaderboard State
  const [leaderboardConfig, setLeaderboardConfig] = useState({
    enabled: true,
    resetFrequency: "monthly", // daily/weekly/monthly
    visibleTo: "all", // students/instructors/all
    showXp: true,
    showBadges: true,
    topRewards: [
      { position: 1, badge: "🏆", xp: 500 },
      { position: 2, badge: "🥈", xp: 300 },
      { position: 3, badge: "🥉", xp: 200 },
    ],
  });

  // Form handlers
  const handleBadgeChange = (id, field, value) => {
    setBadges(
      badges.map((badge) =>
        badge.id === id ? { ...badge, [field]: value } : badge
      )
    );
  };

  const addNewBadge = () => {
    setBadges([
      ...badges,
      {
        id: badges.length + 1,
        name: "",
        icon: "🆕",
        criteria: "",
        xp: 0,
        enabled: true,
      },
    ]);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <CogIcon className="w-6 h-6 mr-2 text-indigo-600" />
          Gamification Settings
        </h2>
        <p className="text-gray-600 mt-1">
          Badges, points, and leaderboards to enhance student engagement
        </p>
      </div>

      <Tab.Group>
        <Tab.List className="flex border-b">
          {["Badges System", "Points System", "Leaderboards"].map(
            (tab, idx) => (
              <Tab
                key={idx}
                className={({ selected }) =>
                  `px-4 py-3 text-sm font-medium focus:outline-none ${
                    selected
                      ? "border-b-2 border-indigo-500 text-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`
                }
              >
                <div className="flex items-center">
                  {idx === 0 && <CheckBadgeIcon className="w-5 h-5 mr-2" />}
                  {idx === 1 && <CurrencyDollarIcon className="w-5 h-5 mr-2" />}
                  {idx === 2 && <ChartBarIcon className="w-5 h-5 mr-2" />}
                  {tab}
                </div>
                bb
              </Tab>
            )
          )}
        </Tab.List>

        <Tab.Panels className="p-6">
          {/* Badges System Tab */}
          <Tab.Panel>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Achievement Badges</h3>
                <button
                  onClick={addNewBadge}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add New Badge
                </button>
              </div>

              <div className="space-y-6">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <select
                          value={badge.icon}
                          onChange={(e) =>
                            handleBadgeChange(badge.id, "icon", e.target.value)
                          }
                          className="text-2xl bg-gray-100 rounded p-1"
                        >
                          <option value="🏅">🏅</option>
                          <option value="⭐">⭐</option>
                          <option value="🎖️">🎖️</option>
                          <option value="🏆">🏆</option>
                          <option value="👑">👑</option>
                          <option value="🆕">🆕</option>
                        </select>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={badge.name}
                            onChange={(e) =>
                              handleBadgeChange(
                                badge.id,
                                "name",
                                e.target.value
                              )
                            }
                            placeholder="Badge name"
                            className="text-lg font-medium border-b border-gray-200 focus:border-indigo-500 focus:outline-none w-full"
                          />
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={badge.enabled}
                              onChange={(e) =>
                                handleBadgeChange(
                                  badge.id,
                                  "enabled",
                                  e.target.checked
                                )
                              }
                              className="h-5 w-5 text-indigo-600 rounded"
                            />
                            <span className="ml-2 text-gray-700">Active</span>
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Award Criteria
                          </label>
                          <input
                            type="text"
                            value={badge.criteria}
                            onChange={(e) =>
                              handleBadgeChange(
                                badge.id,
                                "criteria",
                                e.target.value
                              )
                            }
                            placeholder="E.g., Complete 5 lessons"
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            XP Reward
                          </label>
                          <input
                            type="number"
                            value={badge.xp}
                            onChange={(e) =>
                              handleBadgeChange(
                                badge.id,
                                "xp",
                                parseInt(e.target.value)
                              )
                            }
                            className="mt-1 block w-24 border border-gray-300 rounded-md p-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tab.Panel>

          {/* Points System Tab */}
          <Tab.Panel>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    XP per Lesson Completed
                  </label>
                  <input
                    type="number"
                    value={pointsConfig.xpPerLesson}
                    onChange={(e) =>
                      setPointsConfig({
                        ...pointsConfig,
                        xpPerLesson: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    XP per Quiz Passed
                  </label>
                  <input
                    type="number"
                    value={pointsConfig.xpPerQuiz}
                    onChange={(e) =>
                      setPointsConfig({
                        ...pointsConfig,
                        xpPerQuiz: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    XP per Course Completion
                  </label>
                  <input
                    type="number"
                    value={pointsConfig.xpPerCourseCompletion}
                    onChange={(e) =>
                      setPointsConfig({
                        ...pointsConfig,
                        xpPerCourseCompletion: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Point to Currency Ratio
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      value={pointsConfig.pointToCurrencyRatio}
                      onChange={(e) =>
                        setPointsConfig({
                          ...pointsConfig,
                          pointToCurrencyRatio: parseFloat(e.target.value),
                        })
                      }
                      className="block w-full pl-7 pr-12 border border-gray-300 rounded-md p-2"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">
                        per 100 XP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={pointsConfig.redeemablePoints}
                    onChange={(e) =>
                      setPointsConfig({
                        ...pointsConfig,
                        redeemablePoints: e.target.checked,
                      })
                    }
                    className="h-5 w-5 text-indigo-600 rounded"
                  />
                  <span className="ml-2 text-gray-700">
                    Allow points redemption for rewards/discounts
                  </span>
                </label>
              </div>
            </div>
          </Tab.Panel>

          {/* Leaderboards Tab */}
          <Tab.Panel>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={leaderboardConfig.enabled}
                    onChange={(e) =>
                      setLeaderboardConfig({
                        ...leaderboardConfig,
                        enabled: e.target.checked,
                      })
                    }
                    className="h-5 w-5 text-indigo-600 rounded"
                  />
                  <span className="ml-2 text-gray-700">
                    Enable Leaderboards
                  </span>
                </label>
              </div>

              {leaderboardConfig.enabled && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Reset Frequency
                      </label>
                      <select
                        value={leaderboardConfig.resetFrequency}
                        onChange={(e) =>
                          setLeaderboardConfig({
                            ...leaderboardConfig,
                            resetFrequency: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Visible To
                      </label>
                      <select
                        value={leaderboardConfig.visibleTo}
                        onChange={(e) =>
                          setLeaderboardConfig({
                            ...leaderboardConfig,
                            visibleTo: e.target.value,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      >
                        <option value="all">All Users</option>
                        <option value="students">Students Only</option>
                        <option value="instructors">Instructors Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Display Options
                    </h4>
                    <div className="space-y-3">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={leaderboardConfig.showXp}
                          onChange={(e) =>
                            setLeaderboardConfig({
                              ...leaderboardConfig,
                              showXp: e.target.checked,
                            })
                          }
                          className="h-5 w-5 text-indigo-600 rounded"
                        />
                        <span className="ml-2 text-gray-700">
                          Show XP Points
                        </span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={leaderboardConfig.showBadges}
                          onChange={(e) =>
                            setLeaderboardConfig({
                              ...leaderboardConfig,
                              showBadges: e.target.checked,
                            })
                          }
                          className="h-5 w-5 text-indigo-600 rounded"
                        />
                        <span className="ml-2 text-gray-700">
                          Show Earned Badges
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Top Player Rewards
                    </h4>
                    <div className="space-y-4">
                      {leaderboardConfig.topRewards.map((reward, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4"
                        >
                          <div className="w-10">
                            <span className="text-xl">{reward.badge}</span>
                          </div>
                          <div className="flex-1">
                            <label className="block text-xs text-gray-500">
                              Position #{reward.position}
                            </label>
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                value={reward.badge}
                                onChange={(e) => {
                                  const newRewards = [
                                    ...leaderboardConfig.topRewards,
                                  ];
                                  newRewards[index].badge = e.target.value;
                                  setLeaderboardConfig({
                                    ...leaderboardConfig,
                                    topRewards: newRewards,
                                  });
                                }}
                                className="w-16 border border-gray-300 rounded-md p-1"
                              />
                              <input
                                type="number"
                                value={reward.xp}
                                onChange={(e) => {
                                  const newRewards = [
                                    ...leaderboardConfig.topRewards,
                                  ];
                                  newRewards[index].xp = parseInt(
                                    e.target.value
                                  );
                                  setLeaderboardConfig({
                                    ...leaderboardConfig,
                                    topRewards: newRewards,
                                  });
                                }}
                                className="w-24 border border-gray-300 rounded-md p-1"
                              />
                              <span className="self-center text-sm">
                                XP Bonus
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default GamificationSettings;

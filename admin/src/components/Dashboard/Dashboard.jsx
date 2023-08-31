import React, { useEffect } from 'react';
import authLogo from "../../Assets/authLogo.svg";
import "./Dashboard.css";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderStats, getRevenueMonthly, getRevenueYearly, getUserStats } from '../../Actions/Dashboard';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { revenueMonthly, revenueYearly, orderStats, userStats, revenueMonthlyLoading, revenueYearlyLoading, orderStatsLoading, userStatsLoading } = useSelector(state => state.dashboardReducer);

  useEffect(() => {
    dispatch(getRevenueMonthly());
    dispatch(getRevenueYearly());
    dispatch(getOrderStats());
    dispatch(getUserStats());
  }, [dispatch]);

  return (
    <div className='dashboard'>
      <div className='dashboard__stats'>
        <div className='dashboard__stats__card graph'>
          <div className='dashboard__stats__card__title'>Monthly Revenue (in ₹) </div>
          <div className='dashboard__stats__card__chart'>
            {revenueMonthlyLoading ? (
              <div className='dashboard__stats__card__chart__loading'>Loading...</div>
            ) : (
              <Line
                data={{
                  labels: revenueMonthly?.labels,
                  datasets: [
                    {
                      label: 'Revenue',
                      data: revenueMonthly?.data,
                      fill: false,
                      backgroundColor: 'rgb(255, 99, 132)',
                      borderColor: 'rgba(255, 99, 132, 0.2)',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
        <div className='dashboard__stats__card graph'>
          <div className='dashboard__stats__card__title'>Yearly Revenue (in ₹) </div>
          <div className='dashboard__stats__card__chart'>
            {revenueYearlyLoading ? (
              <div className='dashboard__stats__card__chart__loading'>Loading...</div>
            ) : (
              <Line
                data={{
                  labels: revenueYearly?.labels,
                  datasets: [
                    {
                      label: 'Revenue',
                      data: revenueYearly?.data,
                      fill: false,
                      backgroundColor: 'rgb(99, 164, 255)',
                      borderColor: 'rgba(99, 164, 255, 0.2)',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
        <div className='dashboard__stats__card orders'>
          <div className='dashboard__stats__card__content'>
            <div className='dashboard__stats__card__content__item'>
              <div className='dashboard__stats__card__content__item__title'>Total Orders</div>
              <div className='dashboard__stats__card__content__item__value'>{orderStats?.total_orders}</div>
            </div>
            <div className='dashboard__stats__card__content__item'>
              <div className='dashboard__stats__card__content__item__title'>Pending Orders</div>
              <div className='dashboard__stats__card__content__item__value'>{orderStats?.pending_orders}</div>
            </div>
            <div className='dashboard__stats__card__content__item'>
              <div className='dashboard__stats__card__content__item__title'>Cancelled Orders</div>
              <div className='dashboard__stats__card__content__item__value'>{orderStats?.cancelled_orders}</div>
            </div>
            <div className='dashboard__stats__card__content__item'>
              <div className='dashboard__stats__card__content__item__title'>Approved Orders</div>
              <div className='dashboard__stats__card__content__item__value'>{orderStats?.approved_orders}</div>
            </div>
          </div>
        </div>
        <div className='dashboard__stats__card users'>
          <div className='dashboard__stats__card__content'>
            <div className='dashboard__stats__card__content__item users'>
              <div className='dashboard__stats__card__content__item__title users'>Total Users</div>
              <div className='dashboard__stats__card__content__item__value users'>{userStats?.total_users}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;

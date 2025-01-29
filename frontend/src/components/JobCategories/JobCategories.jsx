import React from 'react'

const JobCategories = () => {
  return (
    <div class="main-container">
      <div class="grid grid-cols-1 pb-8 text-center">
        <h3 class="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
          Popular Categories
        </h3>
        <p class="text-slate-400 max-w-xl mx-auto">
          Search all the open positions on the web. Get your own personalized
          salary estimate. Read reviews on over 30000+ companies worldwide.
        </p>
      </div>
      <div class="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
        <div class="group px-3 py-10 rounded-md shadow dark:shadow-gray-700 hover:shadow-emerald-600/10 dark:hover:shadow-emerald-600/10 text-center bg-white dark:bg-slate-900 hover:bg-emerald-600/5 dark:hover:bg-emerald-600/5 transition duration-500">
          <div class="size-16 bg-emerald-600/5 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white rounded-md text-2xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-700 transition duration-500 mx-auto">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M913.9 552.2L805 181.4v-.1c-7.6-22.9-25.7-36.5-48.3-36.5-23.4 0-42.5 13.5-49.7 35.2l-71.4 213H388.8l-71.4-213c-7.2-21.7-26.3-35.2-49.7-35.2-23.1 0-42.5 14.8-48.4 36.6L110.5 552.2c-4.4 14.7 1.2 31.4 13.5 40.7l368.5 276.4c2.6 3.6 6.2 6.3 10.4 7.8l8.6 6.4 8.5-6.4c4.9-1.7 9-4.7 11.9-8.9l368.4-275.4c12.4-9.2 18-25.9 13.6-40.6zM751.7 193.4c1-1.8 2.9-1.9 3.5-1.9 1.1 0 2.5.3 3.4 3L818 394.3H684.5l67.2-200.9zm-487.4 1c.9-2.6 2.3-2.9 3.4-2.9 2.7 0 2.9.1 3.4 1.7l67.3 201.2H206.5l57.8-200zM158.8 558.7l28.2-97.3 202.4 270.2-230.6-172.9zm73.9-116.4h122.1l90.8 284.3-212.9-284.3zM512.9 776L405.7 442.3H620L512.9 776zm157.9-333.7h119.5L580 723.1l90.8-280.8zm-40.7 293.9l207.3-276.7 29.5 99.2-236.8 177.5z"></path>
            </svg>
          </div>
          <div class="content mt-6">
            <a
              class="title text-lg font-semibold hover:text-emerald-600"
              href="/"
            >
              Business <br /> Development
            </a>
            <p class="text-slate-400 mt-3">74 Jobs</p>
          </div>
        </div>
        <div class="group px-3 py-10 rounded-md shadow dark:shadow-gray-700 hover:shadow-emerald-600/10 dark:hover:shadow-emerald-600/10 text-center bg-white dark:bg-slate-900 hover:bg-emerald-600/5 dark:hover:bg-emerald-600/5 transition duration-500">
          <div class="size-16 bg-emerald-600/5 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white rounded-md text-2xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-700 transition duration-500 mx-auto">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.5 2H9l-.35.15-.65.64-.65-.64L7 2H1.5l-.5.5v10l.5.5h5.29l.86.85h.7l.86-.85h5.29l.5-.5v-10l-.5-.5zm-7 10.32l-.18-.17L7 12H2V3h4.79l.74.74-.03 8.58zM14 12H9l-.35.15-.14.13V3.7l.7-.7H14v9zM6 5H3v1h3V5zm0 4H3v1h3V9zM3 7h3v1H3V7zm10-2h-3v1h3V5zm-3 2h3v1h-3V7zm0 2h3v1h-3V9z"
              ></path>
            </svg>
          </div>
          <div class="content mt-6">
            <a
              class="title text-lg font-semibold hover:text-emerald-600"
              href="/"
            >
              Marketing &amp; <br /> Communication
            </a>
            <p class="text-slate-400 mt-3">20 Jobs</p>
          </div>
        </div>
        <div class="group px-3 py-10 rounded-md shadow dark:shadow-gray-700 hover:shadow-emerald-600/10 dark:hover:shadow-emerald-600/10 text-center bg-white dark:bg-slate-900 hover:bg-emerald-600/5 dark:hover:bg-emerald-600/5 transition duration-500">
          <div class="size-16 bg-emerald-600/5 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white rounded-md text-2xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-700 transition duration-500 mx-auto">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M864 518H506V160c0-4.4-3.6-8-8-8h-26a398.46 398.46 0 0 0-282.8 117.1 398.19 398.19 0 0 0-85.7 127.1A397.61 397.61 0 0 0 72 552a398.46 398.46 0 0 0 117.1 282.8c36.7 36.7 79.5 65.6 127.1 85.7A397.61 397.61 0 0 0 472 952a398.46 398.46 0 0 0 282.8-117.1c36.7-36.7 65.6-79.5 85.7-127.1A397.61 397.61 0 0 0 872 552v-26c0-4.4-3.6-8-8-8zM705.7 787.8A331.59 331.59 0 0 1 470.4 884c-88.1-.4-170.9-34.9-233.2-97.2C174.5 724.1 140 640.7 140 552c0-88.7 34.5-172.1 97.2-234.8 54.6-54.6 124.9-87.9 200.8-95.5V586h364.3c-7.7 76.3-41.3 147-96.6 201.8zM952 462.4l-2.6-28.2c-8.5-92.1-49.4-179-115.2-244.6A399.4 399.4 0 0 0 589 74.6L560.7 72c-4.7-.4-8.7 3.2-8.7 7.9V464c0 4.4 3.6 8 8 8l384-1c4.7 0 8.4-4 8-8.6zm-332.2-58.2V147.6a332.24 332.24 0 0 1 166.4 89.8c45.7 45.6 77 103.6 90 166.1l-256.4.7z"></path>
            </svg>
          </div>
          <div class="content mt-6">
            <a
              class="title text-lg font-semibold hover:text-emerald-600"
              href="/"
            >
              Project <br /> Management
            </a>
            <p class="text-slate-400 mt-3">35 Jobs</p>
          </div>
        </div>
        <div class="group px-3 py-10 rounded-md shadow dark:shadow-gray-700 hover:shadow-emerald-600/10 dark:hover:shadow-emerald-600/10 text-center bg-white dark:bg-slate-900 hover:bg-emerald-600/5 dark:hover:bg-emerald-600/5 transition duration-500">
          <div class="size-16 bg-emerald-600/5 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white rounded-md text-2xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-700 transition duration-500 mx-auto">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.5 1L4 1.5V3.02746C4.16417 3.00932 4.331 3 4.5 3C4.669 3 4.83583 3.00932 5 3.02746V2H14V7H12.2929L11 8.29289V7H8.97254C8.99068 7.16417 9 7.331 9 7.5C9 7.669 8.99068 7.83583 8.97254 8H10V9.5L10.8536 9.85355L12.7071 8H14.5L15 7.5V1.5L14.5 1H4.5Z"></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.41705 10.4288C7.37039 9.80348 8 8.72527 8 7.5C8 5.567 6.433 4 4.5 4C2.567 4 1 5.567 1 7.5C1 8.72527 1.62961 9.80348 2.58295 10.4288C2.11364 10.6498 1.68557 10.9505 1.31802 11.318C0.900156 11.7359 0.568688 12.232 0.342542 12.7779C0.180451 13.1692 0.0747425 13.5807 0.0278638 14C0.00933826 14.1657 0 14.3326 0 14.5V15H1L0.999398 14.5C0.999398 14.4784 0.999599 14.4567 1 14.4351C1.00811 13.9975 1.09823 13.5651 1.26587 13.1604C1.44179 12.7357 1.69964 12.3498 2.0247 12.0247C2.34976 11.6996 2.73566 11.4418 3.16038 11.2659C3.57088 11.0958 4.00986 11.0056 4.45387 10.9997C4.46922 10.9999 4.4846 11 4.5 11C4.5154 11 4.53078 10.9999 4.54613 10.9997C4.99014 11.0056 5.42912 11.0958 5.83962 11.2659C6.26433 11.4418 6.65024 11.6996 6.9753 12.0247C7.30036 12.3498 7.55821 12.7357 7.73413 13.1604C7.90177 13.5651 7.99189 13.9975 8 14.4351C8.0004 14.4567 8.0006 14.4784 8.0006 14.5L8 15H9V14.5C9 14.3326 8.99066 14.1657 8.97214 14C8.92526 13.5807 8.81955 13.1692 8.65746 12.7779C8.43131 12.232 8.09984 11.7359 7.68198 11.318C7.31443 10.9505 6.88636 10.6498 6.41705 10.4288ZM4.5 10C3.11929 10 2 8.88071 2 7.5C2 6.11929 3.11929 5 4.5 5C5.88071 5 7 6.11929 7 7.5C7 8.88071 5.88071 10 4.5 10Z"
              ></path>
            </svg>
          </div>
          <div class="content mt-6">
            <a
              class="title text-lg font-semibold hover:text-emerald-600"
              href="/"
            >
              Customer <br /> Service
            </a>
            <p class="text-slate-400 mt-3">46 Jobs</p>
          </div>
        </div>
        <div class="group px-3 py-10 rounded-md shadow dark:shadow-gray-700 hover:shadow-emerald-600/10 dark:hover:shadow-emerald-600/10 text-center bg-white dark:bg-slate-900 hover:bg-emerald-600/5 dark:hover:bg-emerald-600/5 transition duration-500">
          <div class="size-16 bg-emerald-600/5 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white rounded-md text-2xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-700 transition duration-500 mx-auto">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 4C8 5.10457 7.10457 6 6 6 4.89543 6 4 5.10457 4 4 4 2.89543 4.89543 2 6 2 7.10457 2 8 2.89543 8 4ZM5 16V22H3V10C3 8.34315 4.34315 7 6 7 6.82059 7 7.56423 7.32946 8.10585 7.86333L10.4803 10.1057 12.7931 7.79289 14.2073 9.20711 10.5201 12.8943 9 11.4587V22H7V16H5ZM10 5H19V14H10V16H14.3654L17.1889 22H19.3993L16.5758 16H20C20.5523 16 21 15.5523 21 15V4C21 3.44772 20.5523 3 20 3H10V5Z"></path>
            </svg>
          </div>
          <div class="content mt-6">
            <a
              class="title text-lg font-semibold hover:text-emerald-600"
              href="/"
            >
              Software <br /> Engineering
            </a>
            <p class="text-slate-400 mt-3">60 Jobs</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobCategories



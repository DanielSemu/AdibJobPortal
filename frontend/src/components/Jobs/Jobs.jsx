import React from "react";

const Jobs = () => {
  return (
    <>
      <div class="main-container">
        <div class="grid grid-cols-1 pb-8 text-center">
          <h3 class="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
            Popular Jobs
          </h3>
          <p class="text-slate-400 max-w-xl mx-auto">
            Search all the open positions on the web. Get your own personalized
            salary estimate. Read reviews on over 30000+ companies worldwide.
          </p>
        </div>
        <div class="grid lg:grid-cols-3 md:grid-cols-2 mt-8 gap-[30px]">
          <div class="group shadow dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-slate-900">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                  <img src="" class="size-8" alt="" />
                </div>
                <div class="ms-3">
                  <a
                    class="block text-[16px] font-semibold hover:text-emerald-600 transition-all duration-500"
                    href="/employer-detail/1"
                  >
                    Facebook
                  </a>
                  <span class="block text-sm text-slate-400">2 days ago</span>
                </div>
              </div>
              <span class="bg-emerald-600/10 group-hover:bg-emerald-600 inline-block text-emerald-600 group-hover:text-white text-xs px-2.5 py-0.5 font-semibold rounded-full transition-all duration-500">
                Full Time
              </span>
            </div>
            <div class="mt-6">
              <a
                class="text-lg hover:text-emerald-600 font-semibold transition-all duration-500"
                href="/job-detail-two/1"
              >
                Web Designer / Developer
              </a>
              <h6 class="text-base font-medium flex items-center">
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="me-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                   <circle cx="12" cy="10" r="3"></circle>
                  {" "}
                </svg>
                Australia
              </h6>
              {" "}
            </div>
            {" "}
            <div class="mt-6">
              {" "}
              <div class="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]">
                {" "}
                <div
                  class="bg-emerald-600 h-[6px] rounded-full"
                  style={{"width": "55%"}}
                >
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div class="mt-2">
                <span class="text-slate-400 text-sm">
                  {" "}
                  <span class="text-slate-900 dark:text-white font-semibold inline-block">
                    21 applied
                  </span>{" "}
                  of 40 vacancy
                </span>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div class="group shadow dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-slate-900">
            {" "}
            <div class="flex items-center justify-between">
              {" "}
              <div class="flex items-center">
                {" "}
                <div class="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                  {" "}
                  <img
                    src=""
                    class="size-8"
                    alt=""
                  />
                  {" "}
                </div>
                {" "}
                <div class="ms-3">
                  {" "}
                  <a
                    class="block text-[16px] font-semibold hover:text-emerald-600 transition-all duration-500"
                    href="/employer-detail/2"
                  >
                    Google
                  </a>
                  <span class="block text-sm text-slate-400">2 days ago</span>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <span class="bg-emerald-600/10 group-hover:bg-emerald-600 inline-block text-emerald-600 group-hover:text-white text-xs px-2.5 py-0.5 font-semibold rounded-full transition-all duration-500">
                Part Time
              </span>
              {" "}
            </div>
            {" "}
            <div class="mt-6">
              {" "}
              <a
                class="text-lg hover:text-emerald-600 font-semibold transition-all duration-500"
                href="/job-detail-two/2"
              >
                Marketing Director
              </a>
              {" "}
              <h6 class="text-base font-medium flex items-center">
                {" "}
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="me-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                   <circle cx="12" cy="10" r="3"></circle>
                  {" "}
                </svg>
                USA
              </h6>
              {" "}
            </div>
            {" "}
            <div class="mt-6">
              {" "}
              <div class="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]">
                {" "}
                <div
                  class="bg-emerald-600 h-[6px] rounded-full"
                  style={{"width": "55%"}}
                >
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div class="mt-2">
                <span class="text-slate-400 text-sm">
                  <span class="text-slate-900 dark:text-white font-semibold inline-block">
                    21 applied
                  </span>{" "}
                  of 40 vacancy
                </span>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div class="group shadow dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-slate-900">
            <div class="flex items-center justify-between">
              {" "}
              <div class="flex items-center">
                {" "}
                <div class="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                  {" "}
                  <img
                    src=""
                    class="size-8"
                    alt=""
                  />
                  {" "}
                </div>
                {" "}
                <div class="ms-3">
                  <a
                    class="block text-[16px] font-semibold hover:text-emerald-600 transition-all duration-500"
                    href="/employer-detail/3"
                  >
                    Android
                  </a>
                  {" "}
                  <span class="block text-sm text-slate-400">2 days ago</span>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <span class="bg-emerald-600/10 group-hover:bg-emerald-600 inline-block text-emerald-600 group-hover:text-white text-xs px-2.5 py-0.5 font-semibold rounded-full transition-all duration-500">
                Remote
              </span>
              {" "}
            </div>
            {" "}
            <div class="mt-6">
              <a
                class="text-lg hover:text-emerald-600 font-semibold transition-all duration-500"
                href="/job-detail-two/3"
              >
                Application Developer
              </a>
              {" "}
              <h6 class="text-base font-medium flex items-center">
                {" "}
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="me-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z">
                    {" "}
                  </path>
                  <circle cx="12" cy="10" r="3"></circle>
                  {" "}
                </svg>{" "}
                China
              </h6>
              {" "}
            </div>
            {" "}
            <div class="mt-6">
              {" "}
              <div class="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]">
                {" "}
                <div
                  class="bg-emerald-600 h-[6px] rounded-full"
                  style={{"width": "55%"}}
                >
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div class="mt-2">
                {" "}
                <span class="text-slate-400 text-sm">
                  <span class="text-slate-900 dark:text-white font-semibold inline-block">
                    21 applied
                  </span>{" "}
                  of 40 vacancy
                </span>
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div class="group shadow dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-slate-900">
            {" "}
            <div class="flex items-center justify-between">
              {" "}
              <div class="flex items-center">
                {" "}
                <div class="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                  {" "}
                  <img
                    src=""
                    class="size-8"
                    alt=""
                  />
                  {" "}
                </div>
                {" "}
                <div class="ms-3">
                  {" "}
                  <a
                    class="block text-[16px] font-semibold hover:text-emerald-600 transition-all duration-500"
                    href="/employer-detail/4"
                  >
                    Lenovo
                  </a>
                  <span class="block text-sm text-slate-400">2 days ago</span>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <span class="bg-emerald-600/10 group-hover:bg-emerald-600 inline-block text-emerald-600 group-hover:text-white text-xs px-2.5 py-0.5 font-semibold rounded-full transition-all duration-500">
                WFH
              </span>
              {" "}
            </div>
            {" "}
            <div class="mt-6">
              <a
                class="text-lg hover:text-emerald-600 font-semibold transition-all duration-500"
                href="/job-detail-two/4"
              >
                Senior Product Designer
              </a>
              {" "}
              <h6 class="text-base font-medium flex items-center">
                {" "}
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="me-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Dubai
              </h6>
              {" "}
            </div>
            {" "}
            <div class="mt-6">
              {" "}
              <div class="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]">
                {" "}
                <div
                  class="bg-emerald-600 h-[6px] rounded-full"
                  style={{"width": "55%"}}
                >
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div class="mt-2">
                <span class="text-slate-400 text-sm">
                  <span class="text-slate-900 dark:text-white font-semibold inline-block">
                    21 applied
                  </span>{" "}
                  of 40 vacancy
                </span>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div class="group shadow dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-slate-900">
            {" "}
            <div class="flex items-center justify-between">
              {" "}
              <div class="flex items-center">
                {" "}
                <div class="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                   <img src="" class="size-8" alt="" />
                </div>
                <div class="ms-3">
                  <a
                    class="block text-[16px] font-semibold hover:text-emerald-600 transition-all duration-500"
                    href="/employer-detail/5"
                  >
                    {" "}
                    Spotify
                  </a>
                  <span class="block text-sm text-slate-400">2 days ago</span>
                </div>
              </div>
              <span class="bg-emerald-600/10 group-hover:bg-emerald-600 inline-block text-emerald-600 group-hover:text-white text-xs px-2.5 py-0.5 font-semibold rounded-full transition-all duration-500">
                Full Time
              </span>
            </div>
            <div class="mt-6">
              <a
                class="text-lg hover:text-emerald-600 font-semibold transition-all duration-500"
                href="/job-detail-two/5"
              >
                Web Designer / Developer
              </a>
              <h6 class="text-base font-medium flex items-center">
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="me-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Australia
              </h6>
            </div>
            <div class="mt-6">
              <div class="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]">
                <div
                  class="bg-emerald-600 h-[6px] rounded-full"
                  style={{"width": "55%"}}
                ></div>
              </div>
              <div class="mt-2">
                <span class="text-slate-400 text-sm">
                  <span class="text-slate-900 dark:text-white font-semibold inline-block">
                    21 applied
                  </span>{" "}
                  of 40 vacancy
                </span>
              </div>
            </div>
          </div>
          <div class="group shadow dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-slate-900">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                  <img src="" class="size-8" alt="" />
                </div>
                <div class="ms-3">
                  <a
                    class="block text-[16px] font-semibold hover:text-emerald-600 transition-all duration-500"
                    href="/employer-detail/6"
                  >
                    {" "}
                    Linkedin
                  </a>
                  <span class="block text-sm text-slate-400">2 days ago</span>
                </div>
              </div>
              <span class="bg-emerald-600/10 group-hover:bg-emerald-600 inline-block text-emerald-600 group-hover:text-white text-xs px-2.5 py-0.5 font-semibold rounded-full transition-all duration-500">
                Remote Time
              </span>
            </div>
            <div class="mt-6">
              <a
                class="text-lg hover:text-emerald-600 font-semibold transition-all duration-500"
                href="/job-detail-two/6"
              >
                Php Developer
              </a>
              <h6 class="text-base font-medium flex items-center">
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="me-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Pakistan
              </h6>
            </div>
            <div class="mt-6">
              <div class="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]">
                <div
                  class="bg-emerald-600 h-[6px] rounded-full"
                  style={{"width": "55%"}}
                ></div>
              </div>
              <div class="mt-2">
                <span class="text-slate-400 text-sm">
                  <span class="text-slate-900 dark:text-white font-semibold inline-block">
                    21 applied
                  </span>{" "}
                  of 40 vacancy
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-12 grid-cols-1 mt-8">
          <div class="md:col-span-12 text-center">
            <a
              class="btn btn-link text-slate-400 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out inline-flex items-center"
              href="/job-grid-two"
            >
              See More Jobs
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                class="ms-1 align-middle"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;

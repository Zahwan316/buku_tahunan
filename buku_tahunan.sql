-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2023 at 04:20 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `buku_tahunan`
--

-- --------------------------------------------------------

--
-- Table structure for table `bukus`
--

CREATE TABLE `bukus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `kode_buku` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bukus`
--

INSERT INTO `bukus` (`id`, `judul`, `img`, `slug`, `kode_buku`, `created_at`, `updated_at`) VALUES
(1, 'test', 'img/OQuIhOY1uVFM9c5S9sU8wT4V30ePD9AL2qHQGrXf.jpg', 'test', 357028210, NULL, NULL),
(2, 'Buku XI RPL 2', 'img/7t0hJEZ8pCvfagIbAZrHDzMaNHBnNfxnduCY1hV9.jpg', 'xi-rpl-2', 895892916, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `buku_contents`
--

CREATE TABLE `buku_contents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `slug` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `code_content` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `buku_contents`
--

INSERT INTO `buku_contents` (`id`, `slug`, `img`, `code_content`, `created_at`, `updated_at`) VALUES
(1, 'test', 'img/jLvbUlWhoHxxhivO6d5nwFAMomtC7qskd3DXfCOX.png', '832024274', NULL, NULL),
(2, 'test', 'img/WsbDpN8NwknKLdcQAv3hEb93YrlJNiw7VP8tOSA4.jpg', '8148958776', NULL, NULL),
(3, 'test', 'img/VoySciyM45b6Gz5YDCDkS4ihZLE6Ie4xueVsWCMK.jpg', '8006467757', NULL, NULL),
(4, 'test', 'img/DdDRfmVMSbipVugcJccFwXtSVUnCCEJ5j5rx3foZ.jpg', '5886560607', NULL, NULL),
(5, 'test', 'img/PfHeKuGVCQbhPV2JYZNMWRaYBEJV6i68WjZAK3jM.jpg', '2221103997', NULL, NULL),
(6, 'xi-rpl-2', 'img/6FFBOak4o5UmYtYfoaXa5g3RFAkrk0YN9kReaoj5.jpg', '3867766510', NULL, NULL),
(7, 'xi-rpl-2', 'img/MTvJL50bN3K4F88VTdm6aUhBn0y70OuHUsdRmDAb.jpg', '4370130861', NULL, NULL),
(8, 'xi-rpl-2', 'img/YNLiUVJhZpS6mXClFSNvQJ8X9B1Tm7HcEtilj06f.jpg', '2772940843', NULL, NULL),
(9, 'xi-rpl-2', 'img/yNOQGmP1rP7blZjZm1XVZttjo4uqkboTnO2ypXEC.jpg', '3797413750', NULL, NULL),
(10, 'xi-rpl-2', 'img/W6es7Q1cWQhPHOVjv2L0yQgMxwZWlolv3luhb4hQ.jpg', '976782444', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `isi` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `kode_komen` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_05_30_135309_create_bukus_table', 1),
(6, '2023_05_30_135352_create_buku_contents_table', 1),
(7, '2023_05_30_135411_create_comments_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(10, 'App\\Models\\User', 1, 'authToken', '207a08f83d0f10ce1c5130e5422dbb4d95820499e23f884fab11ef11603208f9', '[\"*\"]', NULL, NULL, '2023-06-08 06:11:04', '2023-06-08 06:11:04'),
(13, 'App\\Models\\User', 1, 'authToken', 'a13ffb35a5aa56fc916d1f97bdcaa58c820b442e048d63b12109231b615146d4', '[\"*\"]', NULL, NULL, '2023-06-08 07:02:38', '2023-06-08 07:02:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `confirmPass` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `email_verified_at`, `password`, `confirmPass`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin316@gmail.com', NULL, '$2a$12$sVarZ/3pzfP8DY9yBEXgf.x1aJQcry6vUgXQxxhb0mfi8VUhCb7Q6', 'admin316', 'admin', NULL, NULL, NULL),
(2, 'skylakke', 'skylakke@gmail.com', NULL, '$2y$10$6NicsAjvJHWcYqlPeFWGWO.0WB5UKQKo1Ku87jRr6fdBcJgBDEmU2', 'darthside', 'user', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bukus`
--
ALTER TABLE `bukus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bukus_kode_buku_unique` (`kode_buku`);

--
-- Indexes for table `buku_contents`
--
ALTER TABLE `buku_contents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `buku_contents_code_content_unique` (`code_content`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `comments_kode_komen_unique` (`kode_komen`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bukus`
--
ALTER TABLE `bukus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `buku_contents`
--
ALTER TABLE `buku_contents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

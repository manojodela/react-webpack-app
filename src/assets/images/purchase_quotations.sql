-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2024 at 07:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `valmar2`
--

-- --------------------------------------------------------

--
-- Table structure for table `purchase_quotations`
--

CREATE TABLE `purchase_quotations` (
  `id` int(10) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) NOT NULL,
  `total` double(20,2) NOT NULL,
  `file_upload` varchar(1024) NOT NULL,
  `created_by` int(10) NOT NULL,
  `status` varchar(20) DEFAULT 'Pending',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_quotations`
--

INSERT INTO `purchase_quotations` (`id`, `order_id`, `supplier_id`, `total`, `file_upload`, `created_by`, `status`, `created_at`, `updated_at`) VALUES
(5, 2874, 1, 100.00, 'pecBuILP5z0EB0FC65GevTuhNYf8FyWX7sNwZUcE.png', 0, NULL, '2024-07-15 19:09:56', '2024-07-15 19:10:10'),
(6, 2875, 1, 200.00, 'Ipfajn8nbcz9MtFlcuEeDK3t7B0sH6Ga25Yxwmet.png', 0, NULL, '2024-07-15 19:13:32', '2024-07-15 19:13:37'),
(7, 2877, 1, 200.00, '4TPdN5MRbo4Qk3SPpkAh9qMYy4J5bKK0H1kzBsw1.png', 0, 'Approved', '2024-07-15 19:19:40', '2024-07-18 19:24:46'),
(8, 2878, 1, 2000.00, '9WkA63VHMcpAD1NLtEe0LaTwvwc7TKW5Rj6loi6F.png', 0, 'Approved', '2024-07-15 19:21:31', '2024-07-18 19:24:07'),
(9, 2880, 2, 2000.00, 'MsnKjLAA7MINZQtlGnUNYzBrTf62NZP9jr7eOOlB.png', 0, 'Approved', '2024-07-16 11:13:31', '2024-07-18 19:00:10'),
(10, 2881, 1, 100.00, 'x5HUo4anZ6TM6ar1l3ITsKeDUbL20ijkohITHLLd.png', 0, 'Approved', '2024-07-16 11:16:48', '2024-07-18 16:34:27'),
(11, 2882, 1, 100.00, 'wto1CMXQgVkaAfyqAwxa37goVJDVgAsYje8fEVOR.png', 0, NULL, '2024-07-16 11:23:02', '2024-07-16 11:23:05'),
(12, 2883, 1, 100.00, 'RkJdF5ARmiBXFTtTMpaEx4Tdy3ew3U1gCFHmZBaT.png', 0, 'Approved', '2024-07-16 11:29:02', '2024-07-18 11:57:40'),
(13, 2884, 1, 100.00, 'NoBTC4VwZZLfBCLXGLX3wXdzXOxcTeMI1mLychdL.png', 0, 'Approved', '2024-07-16 11:30:16', '2024-07-17 20:46:06'),
(14, 2885, 1, 3.00, 'z4TnNN67k28vR7vAuAsiaMVc9eYGoGfoeKgnAEYl.png', 0, 'Approved', '2024-07-16 11:31:26', '2024-07-17 18:25:02'),
(15, 2886, 1, 5.00, 'Ca8LNVlARuLTqSGZ9hJFPxyUxkqqgLFaRqjb5nJy.png', 0, 'Approved', '2024-07-16 11:43:32', '2024-07-17 18:24:49'),
(16, 2887, 1, 1200.00, '7AzIYw7TBDrT7Z8qPbLYTVgfeCMUOl3TaYrAwxFR.png', 0, NULL, '2024-07-16 12:00:46', '2024-07-16 12:01:02'),
(17, 83444, 2, 200.00, 'JoXUUUhSyLwo7SxexoMVshFaAZvFceIKbn1jD8Xx.png', 6, NULL, '2024-07-16 16:23:41', '2024-07-16 16:23:41'),
(18, 66528, 1, 300.00, 'greenhealth.png', 6, NULL, '2024-07-16 16:33:04', '2024-07-16 16:33:04'),
(19, 2888, 2, 1000.00, 'VnCWihc3NNSvX9k2AcnaN2dSXbrMCmNJBEzwikuY.png', 6, NULL, '2024-07-16 16:41:06', '2024-07-16 16:41:08'),
(20, 2889, 2, 1000.00, '3IPHkAb6sqb5q98jZ3z6gnmSHlAJqZuC4wgWuoBC.pdf', 6, NULL, '2024-07-16 16:46:09', '2024-07-16 16:46:11'),
(21, 2890, 1, 200.00, 'wPpqVTYqQMnpQDdO8QPIZGTTNISVLmsBpaJVpz9Z.xlsx', 6, NULL, '2024-07-16 18:11:56', '2024-07-16 18:12:09'),
(22, 2891, 1, 100.00, 'yl1bmWnI2j4L7z4UCrki9uqbJgIeJAfHcPHxE5OG.pdf', 6, NULL, '2024-07-16 19:16:42', '2024-07-16 19:16:46'),
(23, 93593, 1, 100.00, 'wCsx1bMoojyo8fHM2WU1UcrqMJ6NirO8fCaZIIiN.pdf', 6, NULL, '2024-07-16 19:29:42', '2024-07-16 19:29:42'),
(24, 93593, 3, 200.00, '9YghtGxZ4wyGxpqYXvmSvHPsxSfyneMwjZbhyq4q.pdf', 6, NULL, '2024-07-16 19:29:42', '2024-07-16 19:29:42'),
(25, 60353, 1, 100.00, 'xTtVIlQDvWWvoETLOtvXCanRz2nHcdD53KPxXB97.pdf', 6, NULL, '2024-07-16 19:37:22', '2024-07-16 19:37:22'),
(26, 60353, 2, 200.00, '5pFR4LFWBgPiobdCLd6ZbbNGyDXNFgTc94r6kv3Y.pdf', 6, NULL, '2024-07-16 19:37:22', '2024-07-16 19:37:22'),
(27, 63365, 1, 1.00, 'LpZbFNQQV3T0CFtWDpp3AqRWiaHzq1otcf0hCNfw.png', 6, NULL, '2024-07-16 19:42:56', '2024-07-16 19:42:56'),
(28, 63365, 2, 2.00, '66TZJ65YBP1DTIJEKGDhkNUVrW09cElxgqHJKy9E.pdf', 6, NULL, '2024-07-16 19:42:56', '2024-07-16 19:42:56'),
(29, 36437, 1, 100.00, 'CeoknwRwquQrM7mbFxHjjSMClenYJ3tALiLNhgPD.png', 6, NULL, '2024-07-16 19:52:21', '2024-07-16 19:52:21'),
(30, 36437, 2, 200.00, 'NWuR3n21OB7clFltkBoJMq5zMsCH0KVs1ULJlxKp.png', 6, NULL, '2024-07-16 19:52:21', '2024-07-16 19:52:21'),
(31, 90182, 2, 23.00, 'YtUZk4MrGYhsYzIXnwMNsOqg9Pk9agEqt1LKgLgd.png', 6, NULL, '2024-07-16 19:56:13', '2024-07-16 19:56:13'),
(32, 90182, 1, 3.00, '5SPde1LBnxxyUMgpBV5C6ldexnu2XWkUIvNzGHVG.png', 6, NULL, '2024-07-16 19:56:13', '2024-07-16 19:56:13'),
(33, 2894, 2, 200.00, 'twg9OPTSkRwBFdUOrMuGr0GzCjSwRPmcdmKCQu6W.png', 6, NULL, '2024-07-16 19:57:49', '2024-07-16 19:59:56'),
(34, 2894, 1, 10.00, 'knNiUefAGcSLk0gKpD4nVE4ZjZgdKP2CyZjfxJY3.png', 6, NULL, '2024-07-16 19:57:49', '2024-07-16 19:59:56'),
(35, 2898, 2, 2000.00, 'suX16W9dgSQZ26Jt2FLnhkSOeIP4PTeesunmM9vU.pdf', 6, NULL, '2024-07-16 20:15:52', '2024-07-16 20:15:55'),
(36, 2898, 3, 100.00, 'cuCUfIFf5FqEAEx5G3LyjAJDxZmkllT1CnJYBtx6.png', 6, NULL, '2024-07-16 20:15:52', '2024-07-16 20:15:55'),
(37, 2899, 1, 1000.00, 'MrUkeq563DrwIYxDPYmN96b7v7Z4NpC0bsHaqbzo.pdf', 6, 'Approved', '2024-07-17 11:04:58', '2024-07-17 18:13:27'),
(38, 2899, 2, 2000.00, 'UpiQviCXbeV9hs161KUmMtkM8CmZEzw6vhItau3A.pdf', 6, 'Approved', '2024-07-17 11:04:58', '2024-07-17 18:13:27'),
(39, 2899, 3, 3000.00, 'G9q0ttQ12xIXtbYZUsglSAFef8xEyKV8LPOK28SB.pdf', 6, 'Approved', '2024-07-17 11:04:58', '2024-07-17 18:13:27'),
(40, 2900, 1, 1000.00, '4I4XehxyTgwGTzRkLLLRspzRyi6ULnEjQ2pUjJg3.pdf', 6, 'Approved', '2024-07-17 15:15:17', '2024-07-17 18:01:08'),
(41, 2900, 3, 20000.00, 'ejdqrnHqVDQWEE8A2IqeTOYPYwvjym6emIwRinSM.pdf', 6, 'Approved', '2024-07-17 15:15:17', '2024-07-17 18:01:08'),
(42, 2900, 2, 1500.00, 'cTFWnfFOEXoIhCUPtyRpjRwXgBHAUKwDhCEGluHk.pdf', 6, 'Approved', '2024-07-17 15:15:17', '2024-07-17 18:01:08'),
(43, 2901, 1, 11.00, '1Cy7zIVftM3Q58Tyjh9B8Om6OHbPByTzoPIzHYPk.pdf', 6, 'Approved', '2024-07-17 16:59:56', '2024-07-17 18:13:17'),
(44, 2902, 2, 100.00, 'K86DLKEHqjBjiYXjVupKh3PpE5tRd6aK592PAcaz.pdf', 6, 'Approved', '2024-07-17 17:04:58', '2024-07-17 18:12:17'),
(45, 2903, 3, 2000.00, 'QnPjooKCfiG0wUBGf73KTzO3pvkiYGip6lmBJ9X1.pdf', 6, 'Approved', '2024-07-17 17:07:08', '2024-07-17 17:43:18'),
(46, 2903, 2, 1000.00, 'cOPAvKwZNuBqxCtbennOVu9pEEluizpA8MXFjOBs.pdf', 6, 'Approved', '2024-07-17 17:07:09', '2024-07-17 17:43:18'),
(47, 2904, 2, 2000.00, 'vlyuttrHiklOgSGYkMkmmpe7uoY0YPFBsoZfiEu1.pdf', 6, 'Approved', '2024-07-17 17:10:50', '2024-07-17 17:43:14'),
(48, 2904, 3, 1100.00, 'l8GxNXcaFXUctVrtyiW24TtZMqEUjw7PY4h8POeb.pdf', 6, 'Approved', '2024-07-17 17:10:50', '2024-07-17 17:43:14'),
(49, 2905, 1, 1000.00, '4w2OtgdIASjsz4lkV6xhMTBu3My04dsAzrc9jtlP.pdf', 6, 'Approved', '2024-07-17 17:12:45', '2024-07-17 17:40:42'),
(50, 2905, 2, 2000.00, '1CSSB4mdcdaYOEt8aIzH1FJniaaxGoeAdLt5ifvD.pdf', 6, 'Approved', '2024-07-17 17:12:45', '2024-07-17 17:40:38'),
(51, 2907, 1, 200.00, 'JP1Yq0STPkZ5UsrmLNruYNAuuCK8S2bL7McvHSze.pdf', 6, 'Approved', '2024-07-17 17:31:15', '2024-07-17 18:14:11'),
(52, 2907, 2, 300.00, 'qtB470YlVK88dZ7WQIYWyinFPEYfxa6coNUyGG76.pdf', 6, 'Approved', '2024-07-17 17:31:15', '2024-07-17 18:14:11'),
(53, 64555, 1, 1000.00, 'bx1Gd57JPIFM6ieMqiovFjqKszsQ7Gyj98TJXp4n.pdf', 6, NULL, '2024-07-17 20:47:30', '2024-07-17 20:47:30'),
(54, 64555, 2, 2000.00, 'LfZkrRK1wd7uhhuUtKwDT0Vu3HOJdBB5R2brr6Ur.pdf', 6, NULL, '2024-07-17 20:47:31', '2024-07-17 20:47:31'),
(55, 64555, 3, 10808.00, 'L5QSJ5pQiO0pYdn4REAYEeqzC6Ep8K6EOQupXc8P.pdf', 6, NULL, '2024-07-17 20:47:31', '2024-07-17 20:47:31'),
(56, 37028, 1, 1000.00, 'iNnuLZRByHNeIFTsHV9sSq6F32R3TZPpErvWDMG4.pdf', 6, NULL, '2024-07-17 20:54:15', '2024-07-17 20:54:15'),
(57, 37028, 2, 3000.00, 'Vh5YjbOqjcrxUFyPrYBhf1lpGNVtOBYYfaINBeo6.pdf', 6, NULL, '2024-07-17 20:54:15', '2024-07-17 20:54:15'),
(58, 37028, 3, 2000.00, '8w233cs7eUOliSDyt3WSuhB3rnozhF4xrqN5H8Cg.pdf', 6, NULL, '2024-07-17 20:54:15', '2024-07-17 20:54:15'),
(59, 2908, 2, 1000.00, 'X9t1dOsJDQMJF0chdkuBbEELRlmiAoVG8fb5P0m0.pdf', 6, 'Approved', '2024-07-17 20:55:41', '2024-07-17 20:56:06'),
(60, 2909, 2, 200.00, 'BLkzvVRRvWMFY4Wh8BVlIlduoqrok8yUebQRWBxz.pdf', 6, 'Approved', '2024-07-18 11:15:28', '2024-07-18 11:19:49'),
(61, 2909, 1, 2000.00, 'WKM9CqCwiEinmohHUYjlM8MqTcNjq84NPDrTVJvr.pdf', 6, 'Approved', '2024-07-18 11:15:28', '2024-07-18 11:19:49'),
(62, 2910, 1, 2000.00, 'G5Sc9k1UWsCDQwPtRGzuAe1lAvS3MXu04LaZeKkd.png', 6, 'Approved', '2024-07-18 12:04:44', '2024-07-18 12:07:33'),
(63, 2910, 2, 3000.00, 'k4FpRpnPTV3norBMXZLekNmvihHiyGxSu1QdqoQp.png', 6, 'Approved', '2024-07-18 12:04:44', '2024-07-18 12:07:33'),
(64, 2910, 3, 78888.00, 'CHeJR811CExytvCaDlWurGRWwgTRqseu2XVLuhlv.png', 6, 'Approved', '2024-07-18 12:04:44', '2024-07-18 12:07:33'),
(65, 37028, 1, 100.00, 'PFM2a2PcVJJ7g8gyrIuGbm1B2ytQ8zs7ScEtQZb7.png', 6, NULL, '2024-07-18 12:35:14', '2024-07-18 12:35:14'),
(66, 37028, 1, 88.00, 'BStFvb6dTZA7e0JEYa80fp97Fa39MPth8rIJuC47.png', 6, NULL, '2024-07-18 13:04:58', '2024-07-18 13:04:58'),
(67, 37028, 1, 99.00, 'rTTDQPig3Lt3wji0fdGXt5GhBBomsea0cgpb6zyf.png', 6, NULL, '2024-07-18 13:08:36', '2024-07-18 13:08:36'),
(68, 37028, 1, 99.00, '8UtRbtH5SeGgHdPNkZRzzTA7TIS59mgFbP5gf5J7.png', 6, NULL, '2024-07-18 13:09:20', '2024-07-18 13:09:20'),
(69, 74127, 1, 20.00, 'MEgcQloK2TgtbTW0jgj0nTDYl1CfFfxQ7DfjjPi1.png', 6, NULL, '2024-07-18 13:15:19', '2024-07-18 13:15:19'),
(70, 105100, 1, 1000.00, 'tOiFrPdasHuGpvJ0ILz00Q7F0mEWpAPWXW1eYAFD.png', 6, NULL, '2024-07-18 14:17:26', '2024-07-18 14:17:26'),
(71, 105100, 2, 2000.00, 'TQBBADLbDBlK9WNVbIU7ZASW12U5IAhf0n6l01RO.png', 6, NULL, '2024-07-18 14:17:26', '2024-07-18 14:17:26'),
(72, 85365, 1, 100.00, 'PpEVsxtS0XoLLtES7PiZnx9fu86DGTtGNo4vUQ14.png', 6, NULL, '2024-07-18 14:21:02', '2024-07-18 14:21:02'),
(73, 85365, 3, 200.00, 'L0Zxy92al4KTGH8TnbgQX80PQd6HZ8Oa3ixCQsa9.png', 6, NULL, '2024-07-18 14:21:02', '2024-07-18 14:21:02'),
(74, 2913, 1, 1000.00, 'hmmwGvLxTvZis9Kt4dXqhl3BBD4uSyJYbtH97ZYE.png', 6, 'Approved', '2024-07-18 14:27:04', '2024-07-18 15:27:40'),
(75, 2913, 2, 2000.00, 'tiDjCr5VS86ccn8N8i8jrulI5GOPMdfZrXrqOnQf.png', 6, 'Approved', '2024-07-18 14:27:04', '2024-07-18 15:27:40'),
(76, 2913, 3, 4000.00, 'z1IYh29WnQfwkbPVTbjkGl8kdVrHUp0rEKN03yI8.png', 6, 'Approved', '2024-07-18 14:27:04', '2024-07-18 15:27:40'),
(77, 2914, 1, 200.00, 'Pffwvh5VENU8bVHwiNy6DfvbGtWXGYTeREYQmCMh.png', 6, 'Approved', '2024-07-18 14:34:22', '2024-07-18 14:45:31'),
(78, 2914, 3, 300.00, 'J4e0EScbLcKrBWohTguDw6rxSdMl56DNjH5B5GRW.png', 6, 'Approved', '2024-07-18 14:34:22', '2024-07-18 14:45:31'),
(79, 2915, 1, 200.00, '1gXsgfsDqA8WX5zG9RZRLZJgEEWgn02oWfbIPzZz.png', 6, 'Approved', '2024-07-18 15:18:47', '2024-07-18 15:53:25'),
(80, 2915, 2, 230.00, 'zf6GytvhckP0OIqhC0tbCZaI7C5NWo8BBsU1dIyU.png', 6, 'Approved', '2024-07-18 15:18:47', '2024-07-18 15:53:25'),
(81, 2916, 1, 100.00, 'QfzfmQWdy8X86e8ro8Jzacoycbe0MhBlNxj0nMQk.pdf', 6, 'Approved', '2024-07-18 16:05:36', '2024-07-18 16:34:42'),
(82, 2916, 2, 233.00, 'sb5Xic0yJOdxXz7sTgIfCQrxx7irOSg8ful7odRB.png', 6, 'Approved', '2024-07-18 16:05:36', '2024-07-18 16:34:42'),
(83, 2917, 2, 1000.00, 'ERyVer6swmxNgMYwsYW7ifSzFxriUsTRY9kR0C47.pdf', 6, 'Approved', '2024-07-18 19:25:43', '2024-07-18 19:29:19'),
(84, 2917, 3, 2000.00, '9PsZ0gdKnxszyC0yoqzxs6pWr9y5W38YHvlnpgSj.pdf', 6, 'Approved', '2024-07-18 19:25:43', '2024-07-18 19:29:19'),
(85, 2917, 1, 20001.00, 'OJ4HX1dwspgafW5MqzLCywkxOuPZLl9T9jdkjySM.pdf', 6, 'Approved', '2024-07-18 19:25:43', '2024-07-18 19:29:19'),
(86, 2918, 1, 200.00, 'mke0oiOdZKfqOvkM3DGAt0aXOCTvOWSVRx3sE13f.pdf', 6, 'Approved', '2024-07-18 19:32:23', '2024-07-18 19:33:55'),
(87, 2918, 3, 300.00, 'oy6fzWolOBsgrFAdEKF7fd6Fh8dj7PHJOiDWLPnJ.pdf', 6, 'Approved', '2024-07-18 19:32:23', '2024-07-18 19:33:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `purchase_quotations`
--
ALTER TABLE `purchase_quotations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `purchase_quotations`
--
ALTER TABLE `purchase_quotations`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

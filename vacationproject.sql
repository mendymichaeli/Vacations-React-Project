-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2020 at 10:30 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `c`
--

CREATE TABLE `c` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `followingVacationId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `followingvacations`
--

CREATE TABLE `followingvacations` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `followingvacations`
--

INSERT INTO `followingvacations` (`id`, `userId`, `vacationId`, `createdAt`, `updatedAt`) VALUES
(1, 1, 40, '2020-12-17 22:57:49', '2020-12-17 22:57:49'),
(3, 1, 37, '2020-12-17 23:17:35', '2020-12-17 23:17:35'),
(5, 10, 40, '2020-12-19 21:58:43', '2020-12-19 21:58:43'),
(6, 10, 39, '2020-12-19 22:15:10', '2020-12-19 22:15:10'),
(8, 1, 38, '2020-12-19 23:27:25', '2020-12-19 23:27:25'),
(9, 10, 38, '2020-12-19 23:27:39', '2020-12-19 23:27:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `firstName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sureName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `firstName`, `sureName`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 0, 'user', 'user', 'user@gmail.com', '123', '2020-12-08 11:41:00', '2020-12-08 11:41:00'),
(8, 1, 'admin', 'admin', 'admin@gmail.com', '123', '2020-12-09 19:24:14', '2020-12-09 19:24:14'),
(10, 0, 'user2', 'user2', 'user2@gmail.com', '123', '2020-12-19 21:47:47', '2020-12-19 21:47:47');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `startDate` varchar(255) NOT NULL,
  `endDate` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `followers` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `image`, `startDate`, `endDate`, `price`, `followers`, `createdAt`, `updatedAt`) VALUES
(36, 'ROME', 'the most amazing place on earth ', 'uploads\\1608140708137_rome.jpg', '2020-12-16', '2020-12-17', '1000', '0', '2020-12-16 17:45:25', '2020-12-20 21:19:59'),
(37, 'LONDON', 'Beautiful destination in Europe', 'uploads\\1608140787634_London.jpg', '2020-12-18', '2020-12-23', '2000', '1', '2020-12-16 17:46:45', '2020-12-20 21:19:59'),
(38, 'PARIS', 'Romantic vacation only for you', 'uploads\\1608140873695_Paris.jpg', '2020-12-19', '2020-12-21', '3500', '2', '2020-12-16 17:48:07', '2020-12-20 21:19:59'),
(39, 'AMSTERDAM', 'if you like cheese its the perfet place for you.', 'uploads\\1608140973965_Amsterdam.jpg', '2020-12-30', '2021-01-01', '2446', '1', '2020-12-16 17:49:54', '2020-12-20 21:20:06'),
(40, 'TEL AVIV', 'Beautiful destination right below your nose', 'uploads\\1608141077645_Tel Aviv.jpg', '2020-12-29', '2021-01-08', '8520', '2', '2020-12-16 17:51:34', '2020-12-20 21:19:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `c`
--
ALTER TABLE `c`
  ADD PRIMARY KEY (`followingVacationId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `followingvacations`
--
ALTER TABLE `followingvacations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followingvacations`
--
ALTER TABLE `followingvacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `c`
--
ALTER TABLE `c`
  ADD CONSTRAINT `c_ibfk_1` FOREIGN KEY (`followingVacationId`) REFERENCES `followingvacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `c_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: stagingdatabasenew.cps4kisgqmqa.ap-south-1.rds.amazonaws.com:3306
-- Generation Time: Feb 14, 2025 at 06:40 PM
-- Server version: 8.0.35
-- PHP Version: 8.3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dcrm_stagingnew`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserId` int NOT NULL,
  `UserName` varchar(1000) NOT NULL,
  `Password` text NOT NULL,
  `email` varchar(1000) NOT NULL,
  `Token` text NOT NULL,
  `CreatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserId`, `UserName`, `Password`, `email`, `Token`, `CreatedDate`) VALUES
(1, 'jackson', '$2b$10$ttwDX.6BH/otLhYVMifck.295KHEZAuSP0WvIueZ3bdC3QqV3XZlC', 'jackson.l@tabtree.in', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjEsImlhdCI6MTczOTQ1NjAwOCwiZXhwIjoxNzQwMDYwODA4fQ.-YFW5vBO86tDSYawDINWQkQTxvtAShVxBc3Y7b2E_ME', '2025-02-13 19:43:28'),
(2, 'joseph', '$2b$10$SoetaPSeScf8eZ.rP4JjYOAsJ7uPJTEH5pvp6fbaOVL/dpNngqaFC', 'jackson.l@gmail.in', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjIsImlhdCI6MTczOTQ3MTA4OSwiZXhwIjoxNzQwMDc1ODg5fQ.uXJ6hY20n12oE-mDoef4jwH2Z4A3khusOC85R1k3IlM', '2025-02-13 23:54:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserId`),
  ADD UNIQUE KEY `UserId_2` (`UserId`),
  ADD KEY `UserId` (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

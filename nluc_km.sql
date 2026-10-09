-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 03, 2026 at 12:17 PM
-- Server version: 8.4.7
-- PHP Version: 8.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nluc_km`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_levels`
--

DROP TABLE IF EXISTS `access_levels`;
CREATE TABLE IF NOT EXISTS `access_levels` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `access_levels_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `access_levels`
--

INSERT INTO `access_levels` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Public', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'DMMMSU Researchers', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'RPSU Staff Only', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Restricted', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Metadata Only', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `access_requests`
--

DROP TABLE IF EXISTS `access_requests`;
CREATE TABLE IF NOT EXISTS `access_requests` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `research_file_id` bigint UNSIGNED NOT NULL,
  `requested_by` bigint UNSIGNED NOT NULL,
  `status_id` bigint UNSIGNED NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci,
  `reviewed_by` bigint UNSIGNED DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `access_requests_reviewed_by_foreign` (`reviewed_by`),
  KEY `access_requests_research_file_id_index` (`research_file_id`),
  KEY `access_requests_requested_by_index` (`requested_by`),
  KEY `access_requests_status_id_index` (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `access_request_statuses`
--

DROP TABLE IF EXISTS `access_request_statuses`;
CREATE TABLE IF NOT EXISTS `access_request_statuses` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `access_request_statuses_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `access_request_statuses`
--

INSERT INTO `access_request_statuses` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Pending', NULL, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Approved', NULL, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Rejected', NULL, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Cancelled', NULL, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `action` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `module` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `record_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `record_id` bigint UNSIGNED DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `activity_logs_record_type_record_id_index` (`record_type`,`record_id`),
  KEY `activity_logs_user_id_index` (`user_id`),
  KEY `activity_logs_module_index` (`module`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_id`, `action`, `module`, `record_type`, `record_id`, `description`, `created_at`, `updated_at`) VALUES
(1, 4, 'Created endorsement', 'endorsements', 'Endorsement', 1, 'NLUC-END-2024-0001', '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(2, 4, 'Created endorsement', 'endorsements', 'Endorsement', 2, 'NLUC-END-2024-0002', '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(3, 4, 'Created endorsement', 'endorsements', 'Endorsement', 3, 'NLUC-END-2024-0003', '2026-10-03 04:14:19', '2026-10-03 04:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

DROP TABLE IF EXISTS `bookmarks`;
CREATE TABLE IF NOT EXISTS `bookmarks` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `research_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookmarks_user_id_research_id_unique` (`user_id`,`research_id`),
  KEY `bookmarks_research_id_foreign` (`research_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `colleges`
--

DROP TABLE IF EXISTS `colleges`;
CREATE TABLE IF NOT EXISTS `colleges` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `colleges_code_unique` (`code`),
  KEY `colleges_code_index` (`code`),
  KEY `colleges_is_active_index` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colleges`
--

INSERT INTO `colleges` (`id`, `name`, `code`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'College of Education', 'CED', 'NLUC College of Education', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'College of Information Systems', 'CIS', 'NLUC College of Information Systems', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'College of Agricultural and Biosystems Engineering', 'CABE', 'NLUC CABE', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'College of Agribusiness Management', 'CABM', 'NLUC CABM', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'College of Agriculture', 'CA', 'NLUC College of Agriculture', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(6, 'College of Arts and Sciences', 'CAS', 'NLUC College of Arts and Sciences', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(7, 'College of Veterinary Medicine', 'CVM', 'NLUC College of Veterinary Medicine', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(8, 'College of Environmental Studies', 'CES', 'NLUC College of Environmental Studies', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(9, 'College of Graduate Studies', 'CGS', 'NLUC College of Graduate Studies', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `commercialization_records`
--

DROP TABLE IF EXISTS `commercialization_records`;
CREATE TABLE IF NOT EXISTS `commercialization_records` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `technology_id` bigint UNSIGNED NOT NULL,
  `status_id` bigint UNSIGNED NOT NULL,
  `potential_partner` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `industry` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agreement_reference` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `license_information` text COLLATE utf8mb4_unicode_ci,
  `date_started` date DEFAULT NULL,
  `date_commercialized` date DEFAULT NULL,
  `revenue_value` decimal(15,2) DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `commercialization_records_created_by_foreign` (`created_by`),
  KEY `commercialization_records_technology_id_index` (`technology_id`),
  KEY `commercialization_records_status_id_index` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `commercialization_records`
--

INSERT INTO `commercialization_records` (`id`, `technology_id`, `status_id`, `potential_partner`, `industry`, `agreement_reference`, `license_information`, `date_started`, `date_commercialized`, `revenue_value`, `remarks`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 'La Union Agri Coop', 'Agriculture', NULL, NULL, '2024-09-01', NULL, NULL, 'Seeded sample.', 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `commercialization_statuses`
--

DROP TABLE IF EXISTS `commercialization_statuses`;
CREATE TABLE IF NOT EXISTS `commercialization_statuses` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `commercialization_statuses_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `commercialization_statuses`
--

INSERT INTO `commercialization_statuses` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'For Assessment', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Under Development', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'For IP Protection', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'For Commercialization', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Negotiation', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(6, 'Licensed', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(7, 'Commercialized', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(8, 'Completed', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `copyright_statuses`
--

DROP TABLE IF EXISTS `copyright_statuses`;
CREATE TABLE IF NOT EXISTS `copyright_statuses` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `copyright_statuses_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `copyright_statuses`
--

INSERT INTO `copyright_statuses` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'DMMMSU-Owned', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Author-Owned', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Licensed', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Third-Party Copyright', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Permission Required', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(6, 'Unknown', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `endorsements`
--

DROP TABLE IF EXISTS `endorsements`;
CREATE TABLE IF NOT EXISTS `endorsements` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tracking_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `research_id` bigint UNSIGNED DEFAULT NULL,
  `document_title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `researcher_id` bigint UNSIGNED NOT NULL,
  `endorsement_type_id` bigint UNSIGNED NOT NULL,
  `current_stage_id` bigint UNSIGNED NOT NULL,
  `current_status_id` bigint UNSIGNED NOT NULL,
  `date_submitted` date DEFAULT NULL,
  `date_received` date DEFAULT NULL,
  `date_forwarded` date DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `updated_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `endorsements_tracking_number_unique` (`tracking_number`),
  KEY `endorsements_endorsement_type_id_foreign` (`endorsement_type_id`),
  KEY `endorsements_created_by_foreign` (`created_by`),
  KEY `endorsements_updated_by_foreign` (`updated_by`),
  KEY `endorsements_tracking_number_index` (`tracking_number`),
  KEY `endorsements_research_id_index` (`research_id`),
  KEY `endorsements_current_stage_id_index` (`current_stage_id`),
  KEY `endorsements_current_status_id_index` (`current_status_id`),
  KEY `endorsements_researcher_id_index` (`researcher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `endorsements`
--

INSERT INTO `endorsements` (`id`, `tracking_number`, `research_id`, `document_title`, `researcher_id`, `endorsement_type_id`, `current_stage_id`, `current_status_id`, `date_submitted`, `date_received`, `date_forwarded`, `remarks`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'NLUC-END-2024-0001', 2, 'Learning Analytics Dashboard for College of Information Systems', 4, 1, 2, 2, '2026-09-23', NULL, NULL, 'Seeded endorsement.', 4, NULL, '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(2, 'NLUC-END-2024-0002', 1, 'Smart Irrigation System for Rice Farms in La Union', 4, 1, 3, 4, '2026-09-23', NULL, NULL, 'Seeded endorsement.', 4, NULL, '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(3, 'NLUC-END-2024-0003', 5, 'Veterinary Health Practices Among Backyard Farmers', 4, 1, 1, 1, '2026-09-23', NULL, NULL, 'Seeded endorsement.', 4, NULL, '2026-10-03 04:14:19', '2026-10-03 04:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `endorsement_qr_transactions`
--

DROP TABLE IF EXISTS `endorsement_qr_transactions`;
CREATE TABLE IF NOT EXISTS `endorsement_qr_transactions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `endorsement_id` bigint UNSIGNED NOT NULL,
  `transaction_type_id` bigint UNSIGNED NOT NULL,
  `reference_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_date` date NOT NULL,
  `transaction_time` time DEFAULT NULL,
  `performed_by` bigint UNSIGNED NOT NULL,
  `office_id` bigint UNSIGNED NOT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `endorsement_qr_transactions_endorsement_id_index` (`endorsement_id`),
  KEY `endorsement_qr_transactions_transaction_type_id_index` (`transaction_type_id`),
  KEY `endorsement_qr_transactions_performed_by_index` (`performed_by`),
  KEY `endorsement_qr_transactions_office_id_index` (`office_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `endorsement_qr_transactions`
--

INSERT INTO `endorsement_qr_transactions` (`id`, `endorsement_id`, `transaction_type_id`, `reference_number`, `transaction_date`, `transaction_time`, `performed_by`, `office_id`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'QR-RCV-0001', '2026-09-24', '12:14:19', 2, 3, 'Seeded QR Received (encoded by RPSU staff)', '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(2, 2, 1, 'QR-RCV-0002', '2026-09-24', '12:14:19', 2, 3, 'Seeded QR Received (encoded by RPSU staff)', '2026-10-03 04:14:19', '2026-10-03 04:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `endorsement_status_histories`
--

DROP TABLE IF EXISTS `endorsement_status_histories`;
CREATE TABLE IF NOT EXISTS `endorsement_status_histories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `endorsement_id` bigint UNSIGNED NOT NULL,
  `previous_stage_id` bigint UNSIGNED DEFAULT NULL,
  `new_stage_id` bigint UNSIGNED NOT NULL,
  `previous_status_id` bigint UNSIGNED DEFAULT NULL,
  `new_status_id` bigint UNSIGNED NOT NULL,
  `changed_by` bigint UNSIGNED NOT NULL,
  `changed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `endorsement_status_histories_previous_stage_id_foreign` (`previous_stage_id`),
  KEY `endorsement_status_histories_new_stage_id_foreign` (`new_stage_id`),
  KEY `endorsement_status_histories_previous_status_id_foreign` (`previous_status_id`),
  KEY `endorsement_status_histories_new_status_id_foreign` (`new_status_id`),
  KEY `endorsement_status_histories_changed_by_foreign` (`changed_by`),
  KEY `endorsement_status_histories_endorsement_id_index` (`endorsement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `endorsement_status_histories`
--

INSERT INTO `endorsement_status_histories` (`id`, `endorsement_id`, `previous_stage_id`, `new_stage_id`, `previous_status_id`, `new_status_id`, `changed_by`, `changed_at`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 2, NULL, 2, 4, '2026-09-23 04:14:19', 'Initial submission', '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(2, 2, NULL, 3, NULL, 4, 4, '2026-09-23 04:14:19', 'Initial submission', '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(3, 3, NULL, 1, NULL, 1, 4, '2026-09-23 04:14:19', 'Initial submission', '2026-10-03 04:14:19', '2026-10-03 04:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `endorsement_types`
--

DROP TABLE IF EXISTS `endorsement_types`;
CREATE TABLE IF NOT EXISTS `endorsement_types` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `endorsement_types_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `endorsement_types`
--

INSERT INTO `endorsement_types` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Research Document Endorsement', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Publication Endorsement', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'IEC Endorsement', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file_types`
--

DROP TABLE IF EXISTS `file_types`;
CREATE TABLE IF NOT EXISTS `file_types` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `file_types_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `file_types`
--

INSERT INTO `file_types` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Research Proposal', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Terminal Report', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Published Research', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Dataset', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Methodology', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(6, 'Research Instrument', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(7, 'Supporting Document', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(8, 'Presentation', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(9, 'Other', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `iec_materials`
--

DROP TABLE IF EXISTS `iec_materials`;
CREATE TABLE IF NOT EXISTS `iec_materials` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `research_id` bigint UNSIGNED DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `iec_type_id` bigint UNSIGNED NOT NULL,
  `iec_status_id` bigint UNSIGNED NOT NULL,
  `college_id` bigint UNSIGNED DEFAULT NULL,
  `target_audience` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `development_date` date DEFAULT NULL,
  `approval_date` date DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `file_path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `iec_materials_created_by_foreign` (`created_by`),
  KEY `iec_materials_research_id_index` (`research_id`),
  KEY `iec_materials_iec_status_id_index` (`iec_status_id`),
  KEY `iec_materials_iec_type_id_index` (`iec_type_id`),
  KEY `iec_materials_college_id_index` (`college_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `iec_materials`
--

INSERT INTO `iec_materials` (`id`, `research_id`, `title`, `description`, `iec_type_id`, `iec_status_id`, `college_id`, `target_audience`, `development_date`, `approval_date`, `release_date`, `file_path`, `remarks`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, 'Organic Fertilizer Farmers Brochure', 'Farmer-friendly brochure.', 1, 7, 4, 'Farmers', '2024-03-01', NULL, '2024-07-01', NULL, NULL, 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `iec_statuses`
--

DROP TABLE IF EXISTS `iec_statuses`;
CREATE TABLE IF NOT EXISTS `iec_statuses` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iec_statuses_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `iec_statuses`
--

INSERT INTO `iec_statuses` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Proposed', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Under Development', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'For Review', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Revision Required', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'For Approval', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(6, 'Approved', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(7, 'Released', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(8, 'Published', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `iec_types`
--

DROP TABLE IF EXISTS `iec_types`;
CREATE TABLE IF NOT EXISTS `iec_types` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iec_types_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `iec_types`
--

INSERT INTO `iec_types` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Brochure', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Flyer', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Poster', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Manual', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Infographic', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(6, 'Information Material', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(7, 'Video', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(8, 'Other', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `innovations`
--

DROP TABLE IF EXISTS `innovations`;
CREATE TABLE IF NOT EXISTS `innovations` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `research_id` bigint UNSIGNED DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `innovation_type_id` bigint UNSIGNED NOT NULL,
  `innovation_status_id` bigint UNSIGNED NOT NULL,
  `college_id` bigint UNSIGNED DEFAULT NULL,
  `lead_innovator_id` bigint UNSIGNED DEFAULT NULL,
  `development_date` date DEFAULT NULL,
  `ip_status_id` bigint UNSIGNED DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `innovations_innovation_type_id_foreign` (`innovation_type_id`),
  KEY `innovations_lead_innovator_id_foreign` (`lead_innovator_id`),
  KEY `innovations_ip_status_id_foreign` (`ip_status_id`),
  KEY `innovations_created_by_foreign` (`created_by`),
  KEY `innovations_research_id_index` (`research_id`),
  KEY `innovations_innovation_status_id_index` (`innovation_status_id`),
  KEY `innovations_college_id_index` (`college_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `innovations`
--

INSERT INTO `innovations` (`id`, `research_id`, `title`, `description`, `innovation_type_id`, `innovation_status_id`, `college_id`, `lead_innovator_id`, `development_date`, `ip_status_id`, `remarks`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Low-Cost Soil Moisture Sensor Prototype', 'Prototype sensor for smart irrigation.', 2, 3, 3, 4, '2024-05-01', 2, NULL, 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `innovation_statuses`
--

DROP TABLE IF EXISTS `innovation_statuses`;
CREATE TABLE IF NOT EXISTS `innovation_statuses` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `innovation_statuses_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `innovation_statuses`
--

INSERT INTO `innovation_statuses` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Concept', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Under Development', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Prototype', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'For IP Protection', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Protected', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(6, 'For Commercialization', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(7, 'Commercialized', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `innovation_types`
--

DROP TABLE IF EXISTS `innovation_types`;
CREATE TABLE IF NOT EXISTS `innovation_types` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `innovation_types_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `innovation_types`
--

INSERT INTO `innovation_types` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Invention', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Prototype', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Process Innovation', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Product Innovation', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Service Innovation', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(6, 'Technology', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(7, 'Other', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `ip_statuses`
--

DROP TABLE IF EXISTS `ip_statuses`;
CREATE TABLE IF NOT EXISTS `ip_statuses` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ip_statuses_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ip_statuses`
--

INSERT INTO `ip_statuses` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Not Applicable', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Pending', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Under Review', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Protected', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Copyrighted', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `knowledge_resources`
--

DROP TABLE IF EXISTS `knowledge_resources`;
CREATE TABLE IF NOT EXISTS `knowledge_resources` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `resource_type_id` bigint UNSIGNED NOT NULL,
  `college_id` bigint UNSIGNED DEFAULT NULL,
  `file_path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `external_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_level_id` bigint UNSIGNED NOT NULL,
  `version` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1.0',
  `uploaded_by` bigint UNSIGNED DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `knowledge_resources_uploaded_by_foreign` (`uploaded_by`),
  KEY `knowledge_resources_resource_type_id_index` (`resource_type_id`),
  KEY `knowledge_resources_college_id_index` (`college_id`),
  KEY `knowledge_resources_access_level_id_index` (`access_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `knowledge_resources`
--

INSERT INTO `knowledge_resources` (`id`, `title`, `description`, `resource_type_id`, `college_id`, `file_path`, `external_url`, `access_level_id`, `version`, `uploaded_by`, `remarks`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'RPSU Research Proposal Template', 'Official proposal template for NLUC researchers.', 3, NULL, NULL, NULL, 1, '2.0', 1, NULL, '2026-10-03 04:14:19', '2026-10-03 04:14:19', NULL),
(2, 'Guide to Terminal Report Writing', 'Best practices guide.', 1, NULL, NULL, NULL, 1, '1.0', 1, NULL, '2026-10-03 04:14:19', '2026-10-03 04:14:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_10_04_000001_create_colleges_table', 1),
(5, '2026_10_04_000002_create_roles_table', 1),
(6, '2026_10_04_000003_create_offices_table', 1),
(7, '2026_10_04_000004_update_users_table', 1),
(8, '2026_10_04_000005_create_user_roles_table', 1),
(9, '2026_10_04_000006_create_user_offices_table', 1),
(10, '2026_10_04_000010_create_research_types_table', 1),
(11, '2026_10_04_000011_create_research_statuses_table', 1),
(12, '2026_10_04_000012_create_research_areas_table', 1),
(13, '2026_10_04_000013_create_research_roles_table', 1),
(14, '2026_10_04_000014_create_ip_statuses_table', 1),
(15, '2026_10_04_000020_create_researches_table', 1),
(16, '2026_10_04_000021_create_research_researcher_table', 1),
(17, '2026_10_04_000030_create_file_types_table', 1),
(18, '2026_10_04_000031_create_access_levels_table', 1),
(19, '2026_10_04_000032_create_copyright_statuses_table', 1),
(20, '2026_10_04_000033_create_usage_permissions_table', 1),
(21, '2026_10_04_000034_create_research_files_table', 1),
(22, '2026_10_04_000040_create_access_request_statuses_table', 1),
(23, '2026_10_04_000041_create_access_requests_table', 1),
(24, '2026_10_04_000050_create_endorsement_types_table', 1),
(25, '2026_10_04_000051_create_workflow_stages_table', 1),
(26, '2026_10_04_000052_create_workflow_statuses_table', 1),
(27, '2026_10_04_000053_create_qr_transaction_types_table', 1),
(28, '2026_10_04_000054_create_endorsements_table', 1),
(29, '2026_10_04_000055_create_endorsement_qr_transactions_table', 1),
(30, '2026_10_04_000056_create_endorsement_status_histories_table', 1),
(31, '2026_10_04_000060_create_publication_types_table', 1),
(32, '2026_10_04_000061_create_publication_statuses_table', 1),
(33, '2026_10_04_000062_create_publications_table', 1),
(34, '2026_10_04_000070_create_iec_types_table', 1),
(35, '2026_10_04_000071_create_iec_statuses_table', 1),
(36, '2026_10_04_000072_create_iec_materials_table', 1),
(37, '2026_10_04_000080_create_innovation_types_table', 1),
(38, '2026_10_04_000081_create_innovation_statuses_table', 1),
(39, '2026_10_04_000082_create_innovations_table', 1),
(40, '2026_10_04_000083_create_technology_statuses_table', 1),
(41, '2026_10_04_000084_create_technologies_table', 1),
(42, '2026_10_04_000085_create_commercialization_statuses_table', 1),
(43, '2026_10_04_000086_create_commercialization_records_table', 1),
(44, '2026_10_04_000090_create_resource_types_table', 1),
(45, '2026_10_04_000091_create_knowledge_resources_table', 1),
(46, '2026_10_04_000100_create_bookmarks_table', 1),
(47, '2026_10_04_000101_create_notifications_table', 1),
(48, '2026_10_04_000102_create_activity_logs_table', 1),
(49, '2026_10_05_000001_rename_records_role_to_rpsu_staff', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'info',
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `data` json DEFAULT NULL,
  `link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_user_id_is_read_index` (`user_id`,`is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `offices`
--

DROP TABLE IF EXISTS `offices`;
CREATE TABLE IF NOT EXISTS `offices` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `offices_code_unique` (`code`),
  KEY `offices_code_index` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `offices`
--

INSERT INTO `offices` (`id`, `name`, `code`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Research and Publication Services Unit', 'RPSU', 'NLUC RPSU main office', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Academic Unit', 'ACAD-UNIT', 'NLUC Academic Unit origin', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Academic Unit \\u2013 Records Office', 'ACAD-RECORDS', 'QR Received stage', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'RPSU \\u2013 Records Office', 'RPSU-RECORDS', 'QR Release stage', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Research, Extension, Commercialization and Innovation Office \\u2013 University', 'RECI-U', 'Downstream university office', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `publications`
--

DROP TABLE IF EXISTS `publications`;
CREATE TABLE IF NOT EXISTS `publications` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `research_id` bigint UNSIGNED DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `publication_type_id` bigint UNSIGNED NOT NULL,
  `publication_status_id` bigint UNSIGNED NOT NULL,
  `journal` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publisher` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `doi` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `abstract` longtext COLLATE utf8mb4_unicode_ci,
  `keywords` text COLLATE utf8mb4_unicode_ci,
  `file_path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `publications_created_by_foreign` (`created_by`),
  KEY `publications_research_id_index` (`research_id`),
  KEY `publications_publication_status_id_index` (`publication_status_id`),
  KEY `publications_publication_type_id_index` (`publication_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `publications`
--

INSERT INTO `publications` (`id`, `research_id`, `title`, `publication_type_id`, `publication_status_id`, `journal`, `publisher`, `publication_date`, `doi`, `url`, `abstract`, `keywords`, `file_path`, `remarks`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, 'Organic Fertilizer from Farm Waste (Journal Version)', 1, 7, 'NLUC R&E Journal', 'DMMMSU-NLUC RPSU', '2024-06-01', NULL, NULL, 'Published version of agribusiness viability study.', 'organic, fertilizer', NULL, NULL, 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `publication_statuses`
--

DROP TABLE IF EXISTS `publication_statuses`;
CREATE TABLE IF NOT EXISTS `publication_statuses` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `publication_statuses_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `publication_statuses`
--

INSERT INTO `publication_statuses` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Draft', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Preparing', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Submitted', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Under Review', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Revision Required', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(6, 'Accepted', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(7, 'Published', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `publication_types`
--

DROP TABLE IF EXISTS `publication_types`;
CREATE TABLE IF NOT EXISTS `publication_types` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `publication_types_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `publication_types`
--

INSERT INTO `publication_types` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Journal Article', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Conference Paper', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Book Chapter', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Technical Bulletin', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Policy Brief', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `qr_transaction_types`
--

DROP TABLE IF EXISTS `qr_transaction_types`;
CREATE TABLE IF NOT EXISTS `qr_transaction_types` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `qr_transaction_types_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `qr_transaction_types`
--

INSERT INTO `qr_transaction_types` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'QR Received', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'QR Release', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `researches`
--

DROP TABLE IF EXISTS `researches`;
CREATE TABLE IF NOT EXISTS `researches` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `research_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abstract` longtext COLLATE utf8mb4_unicode_ci,
  `keywords` text COLLATE utf8mb4_unicode_ci,
  `research_type_id` bigint UNSIGNED NOT NULL,
  `research_status_id` bigint UNSIGNED NOT NULL,
  `research_area_id` bigint UNSIGNED DEFAULT NULL,
  `college_id` bigint UNSIGNED DEFAULT NULL,
  `lead_researcher_id` bigint UNSIGNED DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `funding_source` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `funding_amount` decimal(15,2) DEFAULT NULL,
  `sdg_alignment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_status_id` bigint UNSIGNED DEFAULT NULL,
  `date_submitted` date DEFAULT NULL,
  `date_completed` date DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `researches_research_code_unique` (`research_code`),
  KEY `researches_ip_status_id_foreign` (`ip_status_id`),
  KEY `researches_created_by_foreign` (`created_by`),
  KEY `researches_research_code_index` (`research_code`),
  KEY `researches_title_index` (`title`),
  KEY `researches_college_id_index` (`college_id`),
  KEY `researches_research_type_id_index` (`research_type_id`),
  KEY `researches_research_status_id_index` (`research_status_id`),
  KEY `researches_research_area_id_index` (`research_area_id`),
  KEY `researches_lead_researcher_id_index` (`lead_researcher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `researches`
--

INSERT INTO `researches` (`id`, `research_code`, `title`, `abstract`, `keywords`, `research_type_id`, `research_status_id`, `research_area_id`, `college_id`, `lead_researcher_id`, `start_date`, `end_date`, `funding_source`, `funding_amount`, `sdg_alignment`, `ip_status_id`, `date_submitted`, `date_completed`, `remarks`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'NLUC-2024-001', 'Smart Irrigation System for Rice Farms in La Union', 'Sample abstract for Smart Irrigation System for Rice Farms in La Union. This record demonstrates the KM repository flow from creation to utilization.', 'NLUC, research, CABE', 2, 1, 5, 3, 4, '2024-01-15', '2024-12-15', 'DMMMSU GAA', 250000.00, 'SDG 2: Zero Hunger', 2, '2024-01-20', NULL, 'Seeded sample record.', 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19', NULL),
(2, 'NLUC-2024-002', 'Learning Analytics Dashboard for College of Information Systems', 'Sample abstract for Learning Analytics Dashboard for College of Information Systems. This record demonstrates the KM repository flow from creation to utilization.', 'NLUC, research, CIS', 4, 2, 2, 2, 4, '2024-01-15', '2024-12-15', 'NLUC R&E Fund', 120000.00, 'SDG 4: Quality Education', 2, '2024-01-20', '2024-12-01', 'Seeded sample record.', 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19', NULL),
(3, 'NLUC-2023-003', 'Organic Fertilizer from Farm Waste: Agribusiness Viability', 'Sample abstract for Organic Fertilizer from Farm Waste: Agribusiness Viability. This record demonstrates the KM repository flow from creation to utilization.', 'NLUC, research, CABM', 2, 3, 3, 4, 4, '2024-01-15', '2024-12-15', 'DA Grant', 300000.00, 'SDG 12: Responsible Consumption', 2, '2024-01-20', '2024-12-01', 'Seeded sample record.', 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19', NULL),
(4, 'NLUC-2024-004', 'Mangrove Rehabilitation in Bauang: Environmental Assessment', 'Sample abstract for Mangrove Rehabilitation in Bauang: Environmental Assessment. This record demonstrates the KM repository flow from creation to utilization.', 'NLUC, research, CES', 1, 1, 8, 8, 4, '2024-01-15', '2024-12-15', 'DENR Grant', 180000.00, 'SDG 13: Climate Action', 2, '2024-01-20', NULL, 'Seeded sample record.', 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19', NULL),
(5, 'NLUC-2023-005', 'Veterinary Health Practices Among Backyard Farmers', 'Sample abstract for Veterinary Health Practices Among Backyard Farmers. This record demonstrates the KM repository flow from creation to utilization.', 'NLUC, research, CVM', 2, 2, 3, 7, 4, '2024-01-15', '2024-12-15', 'DMMMSU GAA', 95000.00, 'SDG 3: Good Health', 2, '2024-01-20', '2024-12-01', 'Seeded sample record.', 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `research_areas`
--

DROP TABLE IF EXISTS `research_areas`;
CREATE TABLE IF NOT EXISTS `research_areas` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `research_areas_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `research_areas`
--

INSERT INTO `research_areas` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Education', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'ICT and Information Systems', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Agriculture', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Agribusiness', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Engineering', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(6, 'Sciences', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(7, 'Veterinary Medicine', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(8, 'Environment', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(9, 'Graduate Studies', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `research_files`
--

DROP TABLE IF EXISTS `research_files`;
CREATE TABLE IF NOT EXISTS `research_files` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `research_id` bigint UNSIGNED NOT NULL,
  `file_type_id` bigint UNSIGNED NOT NULL,
  `original_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stored_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `storage_path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mime_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_size` bigint NOT NULL DEFAULT '0',
  `access_level_id` bigint UNSIGNED NOT NULL,
  `copyright_status_id` bigint UNSIGNED DEFAULT NULL,
  `usage_permission_id` bigint UNSIGNED DEFAULT NULL,
  `version` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1.0',
  `uploaded_by` bigint UNSIGNED DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `research_files_copyright_status_id_foreign` (`copyright_status_id`),
  KEY `research_files_usage_permission_id_foreign` (`usage_permission_id`),
  KEY `research_files_uploaded_by_foreign` (`uploaded_by`),
  KEY `research_files_research_id_index` (`research_id`),
  KEY `research_files_file_type_id_index` (`file_type_id`),
  KEY `research_files_access_level_id_index` (`access_level_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `research_researcher`
--

DROP TABLE IF EXISTS `research_researcher`;
CREATE TABLE IF NOT EXISTS `research_researcher` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `research_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `research_role_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `research_researcher_research_id_user_id_unique` (`research_id`,`user_id`),
  KEY `research_researcher_research_role_id_foreign` (`research_role_id`),
  KEY `research_researcher_research_id_index` (`research_id`),
  KEY `research_researcher_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `research_researcher`
--

INSERT INTO `research_researcher` (`id`, `research_id`, `user_id`, `research_role_id`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(2, 1, 3, 4, '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(3, 2, 4, 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(4, 2, 3, 4, '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(5, 3, 4, 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(6, 3, 3, 4, '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(7, 4, 4, 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(8, 4, 3, 4, '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(9, 5, 4, 1, '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(10, 5, 3, 4, '2026-10-03 04:14:19', '2026-10-03 04:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `research_roles`
--

DROP TABLE IF EXISTS `research_roles`;
CREATE TABLE IF NOT EXISTS `research_roles` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `research_roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `research_roles`
--

INSERT INTO `research_roles` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Lead Researcher', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Co-Researcher', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Research Assistant', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Adviser', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Other', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `research_statuses`
--

DROP TABLE IF EXISTS `research_statuses`;
CREATE TABLE IF NOT EXISTS `research_statuses` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `research_statuses_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `research_statuses`
--

INSERT INTO `research_statuses` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Ongoing', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Completed', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Published', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Archived', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `research_types`
--

DROP TABLE IF EXISTS `research_types`;
CREATE TABLE IF NOT EXISTS `research_types` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `research_types_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `research_types`
--

INSERT INTO `research_types` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Basic Research', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Applied Research', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Developmental Research', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Institutional Research', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Thesis', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(6, 'Dissertation', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(7, 'Capstone', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(8, 'Extension-Based Research', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `resource_types`
--

DROP TABLE IF EXISTS `resource_types`;
CREATE TABLE IF NOT EXISTS `resource_types` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `resource_types_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `resource_types`
--

INSERT INTO `resource_types` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Guidelines', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Policies', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Templates', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'FAQs', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Procedures', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(6, 'Best Practices', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(7, 'Research Instruments', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(8, 'Training Materials', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(9, 'Reference Materials', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(10, 'External Resources', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'RPSU Administrator', 'Main system administrator. Manage users, facilitators, research records, files, access requests, metadata, publication/IEC/innovation records, system settings, and administrative functions.', '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'RPSU Staff', 'RPSU processing staff. Receive and process documents, update current file location and status, record QR information from the Records Office, maintain status history and remarks, and assist in research-related processing.', '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Research & Publication Facilitator', 'College/area facilitator. Assist with research-related activities and facilitate processes within assigned scope.', '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Researcher', 'Research user. Search research, view authorized files, request access, download permitted files, view own research, submit/track own endorsements, and monitor current file location.', '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('rXqXnx8wY8Svh0jBMh7iRDdUzKpXh0O8LVD38jlq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoib09jdVl6WGpRYnJsRFU4WjlWSEk2QmlYZlVtb1JPWWpiNnlmMjhoQiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1791029708);

-- --------------------------------------------------------

--
-- Table structure for table `technologies`
--

DROP TABLE IF EXISTS `technologies`;
CREATE TABLE IF NOT EXISTS `technologies` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `innovation_id` bigint UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `technology_status_id` bigint UNSIGNED NOT NULL,
  `technology_readiness_level` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_reference` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `development_date` date DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `technologies_innovation_id_index` (`innovation_id`),
  KEY `technologies_technology_status_id_index` (`technology_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `technologies`
--

INSERT INTO `technologies` (`id`, `innovation_id`, `title`, `description`, `technology_status_id`, `technology_readiness_level`, `ip_reference`, `development_date`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 1, 'Smart Irrigation Sensor Tech', 'Field-ready sensor technology.', 2, 'TRL 6', NULL, '2024-08-01', NULL, '2026-10-03 04:14:19', '2026-10-03 04:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `technology_statuses`
--

DROP TABLE IF EXISTS `technology_statuses`;
CREATE TABLE IF NOT EXISTS `technology_statuses` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `technology_statuses_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `technology_statuses`
--

INSERT INTO `technology_statuses` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Under Development', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Validated', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Ready for Transfer', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Transferred', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'Commercialized', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `usage_permissions`
--

DROP TABLE IF EXISTS `usage_permissions`;
CREATE TABLE IF NOT EXISTS `usage_permissions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usage_permissions_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `usage_permissions`
--

INSERT INTO `usage_permissions` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'View Only', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Download Allowed', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Restricted Download', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'External Link Only', NULL, 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middle_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `suffix` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employee_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `college_id` bigint UNSIGNED DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_employee_number_unique` (`employee_number`),
  KEY `users_college_id_foreign` (`college_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `middle_name`, `last_name`, `suffix`, `name`, `email`, `employee_number`, `college_id`, `is_active`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'RPSU', NULL, 'Administrator', NULL, 'RPSU Administrator', 'admin@nluc.dmmmsu.edu.ph', 'NLUC-ADMIN-001', 2, 1, '2026-10-03 04:14:18', '$2y$12$QTx7bfUqHqLL4g.8DSNeOemxumUx1Wwlzf2mzTaDf9NAafpKQd0ou', NULL, '2026-10-03 04:14:18', '2026-10-03 04:14:18'),
(2, 'RPSU', NULL, 'Staff', NULL, 'RPSU Staff', 'staff@nluc.dmmmsu.edu.ph', 'NLUC-STAFF-001', NULL, 1, '2026-10-03 04:14:18', '$2y$12$5oEduswj37T3eakvVql/Yu9rEXzBeh3dKN8RvJBwZ91sL3lWQWqo.', NULL, '2026-10-03 04:14:18', '2026-10-03 04:14:18'),
(3, 'Research', NULL, 'Facilitator', NULL, 'Research Facilitator', 'facilitator@nluc.dmmmsu.edu.ph', 'NLUC-FAC-001', 1, 1, '2026-10-03 04:14:19', '$2y$12$KaDWHj8SKeP4ODIwNlSCtubTI8NZ4McErNnQt2s0YXS1xjOcDtow6', NULL, '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(4, 'Juan', NULL, 'Researcher', NULL, 'Juan Researcher', 'researcher@nluc.dmmmsu.edu.ph', 'NLUC-RES-001', 5, 1, '2026-10-03 04:14:19', '$2y$12$YqX8bnq6KwzLbYKJlWoZsueVlnDJwhWhuCHhI5mNqq3JQc6un13jO', NULL, '2026-10-03 04:14:19', '2026-10-03 04:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `user_offices`
--

DROP TABLE IF EXISTS `user_offices`;
CREATE TABLE IF NOT EXISTS `user_offices` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `office_id` bigint UNSIGNED NOT NULL,
  `is_primary` tinyint(1) NOT NULL DEFAULT '0',
  `assigned_from` date DEFAULT NULL,
  `assigned_until` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_offices_office_id_foreign` (`office_id`),
  KEY `user_offices_user_id_office_id_index` (`user_id`,`office_id`),
  KEY `user_offices_is_primary_index` (`is_primary`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_offices`
--

INSERT INTO `user_offices` (`id`, `user_id`, `office_id`, `is_primary`, `assigned_from`, `assigned_until`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '2026-10-03', NULL, '2026-10-03 04:14:18', '2026-10-03 04:14:18'),
(2, 2, 1, 1, '2026-10-03', NULL, '2026-10-03 04:14:18', '2026-10-03 04:14:18'),
(3, 3, 1, 1, '2026-10-03', NULL, '2026-10-03 04:14:19', '2026-10-03 04:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_roles_user_id_role_id_unique` (`user_id`,`role_id`),
  KEY `user_roles_user_id_index` (`user_id`),
  KEY `user_roles_role_id_index` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2026-10-03 04:14:18', '2026-10-03 04:14:18'),
(2, 2, 2, '2026-10-03 04:14:18', '2026-10-03 04:14:18'),
(3, 3, 3, '2026-10-03 04:14:19', '2026-10-03 04:14:19'),
(4, 4, 4, '2026-10-03 04:14:19', '2026-10-03 04:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `workflow_stages`
--

DROP TABLE IF EXISTS `workflow_stages`;
CREATE TABLE IF NOT EXISTS `workflow_stages` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `workflow_stages_name_unique` (`name`),
  UNIQUE KEY `workflow_stages_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `workflow_stages`
--

INSERT INTO `workflow_stages` (`id`, `name`, `code`, `sort_order`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Academic Unit', 'STAGE-ACAD', 1, 'Origin academic unit', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'Academic Unit \\u2013 Records Office', 'STAGE-ACAD-REC', 2, 'QR Received stage', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'RPSU', 'STAGE-RPSU', 3, 'RPSU processing', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'RPSU \\u2013 Records Office', 'STAGE-RPSU-REC', 4, 'QR Release stage', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'RECI Office \\u2013 University', 'STAGE-RECI', 5, 'Downstream university office', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `workflow_statuses`
--

DROP TABLE IF EXISTS `workflow_statuses`;
CREATE TABLE IF NOT EXISTS `workflow_statuses` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `workflow_statuses_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `workflow_statuses`
--

INSERT INTO `workflow_statuses` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Endorsed / Submitted', '', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(2, 'QR Received', '', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(3, 'Received by RPSU', '', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(4, 'Under Processing', '', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(5, 'For Release', '', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(6, 'QR Release', '', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(7, 'Forwarded / Endorsed to RECI', '', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17'),
(8, 'Completed / Closed', '', 1, '2026-10-03 04:14:17', '2026-10-03 04:14:17');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `access_requests`
--
ALTER TABLE `access_requests`
  ADD CONSTRAINT `access_requests_requested_by_foreign` FOREIGN KEY (`requested_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `access_requests_research_file_id_foreign` FOREIGN KEY (`research_file_id`) REFERENCES `research_files` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `access_requests_reviewed_by_foreign` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `access_requests_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `access_request_statuses` (`id`);

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD CONSTRAINT `bookmarks_research_id_foreign` FOREIGN KEY (`research_id`) REFERENCES `researches` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookmarks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `commercialization_records`
--
ALTER TABLE `commercialization_records`
  ADD CONSTRAINT `commercialization_records_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `commercialization_records_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `commercialization_statuses` (`id`),
  ADD CONSTRAINT `commercialization_records_technology_id_foreign` FOREIGN KEY (`technology_id`) REFERENCES `technologies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `endorsements`
--
ALTER TABLE `endorsements`
  ADD CONSTRAINT `endorsements_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `endorsements_current_stage_id_foreign` FOREIGN KEY (`current_stage_id`) REFERENCES `workflow_stages` (`id`),
  ADD CONSTRAINT `endorsements_current_status_id_foreign` FOREIGN KEY (`current_status_id`) REFERENCES `workflow_statuses` (`id`),
  ADD CONSTRAINT `endorsements_endorsement_type_id_foreign` FOREIGN KEY (`endorsement_type_id`) REFERENCES `endorsement_types` (`id`),
  ADD CONSTRAINT `endorsements_research_id_foreign` FOREIGN KEY (`research_id`) REFERENCES `researches` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `endorsements_researcher_id_foreign` FOREIGN KEY (`researcher_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `endorsements_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `endorsement_qr_transactions`
--
ALTER TABLE `endorsement_qr_transactions`
  ADD CONSTRAINT `endorsement_qr_transactions_endorsement_id_foreign` FOREIGN KEY (`endorsement_id`) REFERENCES `endorsements` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `endorsement_qr_transactions_office_id_foreign` FOREIGN KEY (`office_id`) REFERENCES `offices` (`id`),
  ADD CONSTRAINT `endorsement_qr_transactions_performed_by_foreign` FOREIGN KEY (`performed_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `endorsement_qr_transactions_transaction_type_id_foreign` FOREIGN KEY (`transaction_type_id`) REFERENCES `qr_transaction_types` (`id`);

--
-- Constraints for table `endorsement_status_histories`
--
ALTER TABLE `endorsement_status_histories`
  ADD CONSTRAINT `endorsement_status_histories_changed_by_foreign` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `endorsement_status_histories_endorsement_id_foreign` FOREIGN KEY (`endorsement_id`) REFERENCES `endorsements` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `endorsement_status_histories_new_stage_id_foreign` FOREIGN KEY (`new_stage_id`) REFERENCES `workflow_stages` (`id`),
  ADD CONSTRAINT `endorsement_status_histories_new_status_id_foreign` FOREIGN KEY (`new_status_id`) REFERENCES `workflow_statuses` (`id`),
  ADD CONSTRAINT `endorsement_status_histories_previous_stage_id_foreign` FOREIGN KEY (`previous_stage_id`) REFERENCES `workflow_stages` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `endorsement_status_histories_previous_status_id_foreign` FOREIGN KEY (`previous_status_id`) REFERENCES `workflow_statuses` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `iec_materials`
--
ALTER TABLE `iec_materials`
  ADD CONSTRAINT `iec_materials_college_id_foreign` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `iec_materials_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `iec_materials_iec_status_id_foreign` FOREIGN KEY (`iec_status_id`) REFERENCES `iec_statuses` (`id`),
  ADD CONSTRAINT `iec_materials_iec_type_id_foreign` FOREIGN KEY (`iec_type_id`) REFERENCES `iec_types` (`id`),
  ADD CONSTRAINT `iec_materials_research_id_foreign` FOREIGN KEY (`research_id`) REFERENCES `researches` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `innovations`
--
ALTER TABLE `innovations`
  ADD CONSTRAINT `innovations_college_id_foreign` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `innovations_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `innovations_innovation_status_id_foreign` FOREIGN KEY (`innovation_status_id`) REFERENCES `innovation_statuses` (`id`),
  ADD CONSTRAINT `innovations_innovation_type_id_foreign` FOREIGN KEY (`innovation_type_id`) REFERENCES `innovation_types` (`id`),
  ADD CONSTRAINT `innovations_ip_status_id_foreign` FOREIGN KEY (`ip_status_id`) REFERENCES `ip_statuses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `innovations_lead_innovator_id_foreign` FOREIGN KEY (`lead_innovator_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `innovations_research_id_foreign` FOREIGN KEY (`research_id`) REFERENCES `researches` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `knowledge_resources`
--
ALTER TABLE `knowledge_resources`
  ADD CONSTRAINT `knowledge_resources_access_level_id_foreign` FOREIGN KEY (`access_level_id`) REFERENCES `access_levels` (`id`),
  ADD CONSTRAINT `knowledge_resources_college_id_foreign` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `knowledge_resources_resource_type_id_foreign` FOREIGN KEY (`resource_type_id`) REFERENCES `resource_types` (`id`),
  ADD CONSTRAINT `knowledge_resources_uploaded_by_foreign` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `publications_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `publications_publication_status_id_foreign` FOREIGN KEY (`publication_status_id`) REFERENCES `publication_statuses` (`id`),
  ADD CONSTRAINT `publications_publication_type_id_foreign` FOREIGN KEY (`publication_type_id`) REFERENCES `publication_types` (`id`),
  ADD CONSTRAINT `publications_research_id_foreign` FOREIGN KEY (`research_id`) REFERENCES `researches` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `researches`
--
ALTER TABLE `researches`
  ADD CONSTRAINT `researches_college_id_foreign` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `researches_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `researches_ip_status_id_foreign` FOREIGN KEY (`ip_status_id`) REFERENCES `ip_statuses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `researches_lead_researcher_id_foreign` FOREIGN KEY (`lead_researcher_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `researches_research_area_id_foreign` FOREIGN KEY (`research_area_id`) REFERENCES `research_areas` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `researches_research_status_id_foreign` FOREIGN KEY (`research_status_id`) REFERENCES `research_statuses` (`id`),
  ADD CONSTRAINT `researches_research_type_id_foreign` FOREIGN KEY (`research_type_id`) REFERENCES `research_types` (`id`);

--
-- Constraints for table `research_files`
--
ALTER TABLE `research_files`
  ADD CONSTRAINT `research_files_access_level_id_foreign` FOREIGN KEY (`access_level_id`) REFERENCES `access_levels` (`id`),
  ADD CONSTRAINT `research_files_copyright_status_id_foreign` FOREIGN KEY (`copyright_status_id`) REFERENCES `copyright_statuses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `research_files_file_type_id_foreign` FOREIGN KEY (`file_type_id`) REFERENCES `file_types` (`id`),
  ADD CONSTRAINT `research_files_research_id_foreign` FOREIGN KEY (`research_id`) REFERENCES `researches` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `research_files_uploaded_by_foreign` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `research_files_usage_permission_id_foreign` FOREIGN KEY (`usage_permission_id`) REFERENCES `usage_permissions` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `research_researcher`
--
ALTER TABLE `research_researcher`
  ADD CONSTRAINT `research_researcher_research_id_foreign` FOREIGN KEY (`research_id`) REFERENCES `researches` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `research_researcher_research_role_id_foreign` FOREIGN KEY (`research_role_id`) REFERENCES `research_roles` (`id`),
  ADD CONSTRAINT `research_researcher_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `technologies`
--
ALTER TABLE `technologies`
  ADD CONSTRAINT `technologies_innovation_id_foreign` FOREIGN KEY (`innovation_id`) REFERENCES `innovations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `technologies_technology_status_id_foreign` FOREIGN KEY (`technology_status_id`) REFERENCES `technology_statuses` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_college_id_foreign` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `user_offices`
--
ALTER TABLE `user_offices`
  ADD CONSTRAINT `user_offices_office_id_foreign` FOREIGN KEY (`office_id`) REFERENCES `offices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_offices_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

from django.db import models


class Chain(models.TextChoices):
    COSTON = "coston"
    SEPOLIA = "sepolia"


class Block(models.Model):
    chain = models.CharField(max_length=7, choices=Chain.choices, unique=True)
    number = models.PositiveIntegerField()
    timestamp = models.PositiveIntegerField()

    def __str__(self):
        return f"Chain: {self.chain} Number: {self.number} Timestamp: {self.timestamp}"


class RelayCall(models.Model):
    chain = models.CharField(max_length=7, choices=Chain.choices)
    timestamp = models.PositiveIntegerField()
    blockNumber = models.PositiveIntegerField()

    tx_hash = models.CharField(max_length=66)

    # RelayRequested fields
    uid = models.PositiveIntegerField()
    relayInitiator = models.CharField(max_length=42)
    relayTarget = models.CharField(max_length=42)
    additionalCalldata = models.BinaryField()
    sourceToken = models.CharField(max_length=42)
    targetToken = models.CharField(max_length=42)
    amount = models.PositiveIntegerField()

    def __str__(self):
        return f"[{self.chain} block: {self.blockNumber}] from: {self.relayInitiator}, target: {self.relayTarget} (tx_hash: {self.tx_hash})"
